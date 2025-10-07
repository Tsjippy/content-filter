<?php
namespace SIM\CONTENTFILTER;
use SIM;

add_filter('asl_query_cpt', __NAMESPACE__.'\limitSearchToPublic', 10, 4);
function limitSearchToPublic($querystr, $args, $id, $_ajax_search){
    if ( !is_user_logged_in() ) {
        // Calculate the current term query
        $current    = buildTermQuery( $args );

        // Now change the arguments
        $args['post_tax_filter'][0]['include'] = [get_cat_ID('Public')];

        // Calculate the new one
        $new        = buildTermQuery( $args );

        // Make the replacement
        $querystr   = str_replace($current, $new, $querystr);
    }

    return $querystr;
}

function buildTermQuery( $args ) {
    global $wpdb;
    $postIdField      = $wpdb->posts . '.ID';
    $postTypeField    = $wpdb->posts . '.post_type';

    if ( isset($_GET['ignore_op']) ) {
        return '';
    }

    $termQuery       = '';
    $termQueryParts = array();

    foreach ( $args['post_tax_filter'] as $k => $item ) {
        $taxTermQuery = '';
        $taxonomy       = $item['taxonomy'];

        // Is there an argument set to allow empty items for this taxonomy filter?
        if ( isset($item['allow_empty']) ) {
            $allowEmptyTaxTerm = $item['allow_empty'];
        } else {
            $allowEmptyTaxTerm = $taxonomy == 'post_tag' ? $args['_post_tags_empty'] : $args['_post_allowEmptyTaxTerm'];
        }

        if ( $allowEmptyTaxTerm == 1 ) {
            $emptyTermsQuery = "
            NOT EXISTS (
                SELECT *
                FROM $wpdb->term_relationships as xt
                INNER JOIN $wpdb->term_taxonomy as tt ON ( xt.term_taxonomy_id = tt.term_taxonomy_id AND tt.taxonomy = '$taxonomy')
                WHERE
                    xt.object_id = $postIdField
            ) OR ";
        } else {
            $emptyTermsQuery = '';
        }

        // Quick explanation for the AND
        // .. MAIN SELECT: selects all object_ids that are not in the array
        // .. SUBSELECT:   excludes all the object_ids that are part of the array
        // This is used because of multiple object_ids (posts in more than 1 tag)
        if ( !empty($item['exclude']) ) {
            $words          = implode( ',', $item['exclude'] );
            $taxTermQuery = " (
                $emptyTermsQuery

                $postIdField IN (
                    SELECT DISTINCT(tr.object_id)
                        FROM $wpdb->term_relationships AS tr
                        LEFT JOIN $wpdb->term_taxonomy as tt ON (tr.term_taxonomy_id = tt.term_taxonomy_id AND tt.taxonomy = '$taxonomy')
                                        WHERE
                                            tt.term_id NOT IN ($words)
                                            AND tr.object_id NOT IN (
                                                SELECT DISTINCT(trs.object_id)
                                                FROM $wpdb->term_relationships AS trs
                            LEFT JOIN $wpdb->term_taxonomy as tts ON (trs.term_taxonomy_id = tts.term_taxonomy_id AND tts.taxonomy = '$taxonomy')
                                                WHERE tts.term_id IN ($words)
                                            )
                                )
                            )";
        }
        if ( !empty($item['include']) ) {
            $words = implode( ',', $item['include'] );
            if ( !empty($taxTermQuery) ) {
                $taxTermQuery .= ' AND ';
            }
            if ( isset($item['logic']) && $item['logic'] == 'andex' ) {
                $taxTermQuery .= "(
                    $emptyTermsQuery

                    " . count($item['include']) . " = ( SELECT COUNT(tr.object_id)
                        FROM $wpdb->term_relationships AS tr
                        LEFT JOIN $wpdb->term_taxonomy as tt ON (tr.term_taxonomy_id = tt.term_taxonomy_id AND tt.taxonomy = '$taxonomy')
                        WHERE tt.term_id IN ($words) AND tr.object_id = $postIdField
                    ) )";
            } else {
                $taxTermQuery .= "(
                    $emptyTermsQuery

                    $postIdField IN ( SELECT DISTINCT(tr.object_id)
                        FROM $wpdb->term_relationships AS tr
                        LEFT JOIN $wpdb->term_taxonomy as tt ON (tr.term_taxonomy_id = tt.term_taxonomy_id AND tt.taxonomy = '$taxonomy')
                        WHERE tt.term_id IN ($words)
                    ) )";
            }
        }

        /**
         * POST TAG SPECIFIC ONLY
         *
         * At this point we need to check if the user wants to hide the empty tags but the $tag_query
         * turned out to be empty. (if not all tags are used and all of them are selected).
         * If so, then return true on every post type other than 'post' OR check if any tags
         * are associated with the post.
         */
        if (
            $taxonomy == 'post_tag' &&
            $args['_post_tags_active'] == 1 &&
            $taxTermQuery == '' &&
            $args['_post_tags_empty'] == 0
        ) {
            $taxTermQuery = "
            (
                ($postTypeField != 'post') OR

                EXISTS (
                    SELECT *
                    FROM $wpdb->term_relationships as xt
                    INNER JOIN $wpdb->term_taxonomy as tt ON ( xt.term_taxonomy_id = tt.term_taxonomy_id AND tt.taxonomy = 'post_tag')
                    WHERE
                        xt.object_id = $postIdField
                )
            )";
        }
        // ----------------------------------------------------

        if ( !empty($taxTermQuery) ) {
            $termQueryParts[] = '(' . $taxTermQuery . ')';
        }
    }

    if ( !empty($termQueryParts) ) {
        $termQuery = 'AND (' . implode(' ' . strtoupper($args['_taxonomy_group_logic']) . ' ', $termQueryParts) . ') ';
    }

    return $termQuery;
}