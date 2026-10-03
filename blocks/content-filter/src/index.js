import { __ } from "@wordpress/i18n";
import { createHigherOrderComponent } from "@wordpress/compose";
import { Fragment, useState, useEffect } from "@wordpress/element";
import { InspectorControls } from "@wordpress/block-editor";
import {
  PanelBody,
  ToggleControl,
  CheckboxControl,
  SearchControl,
  Spinner,
  Disabled,
} from "@wordpress/components";
import { useSelect, dispatch, select } from "@wordpress/data";
import { store as coreDataStore } from "@wordpress/core-data";
import { decodeEntities } from "@wordpress/html-entities";
import apiFetch from "@wordpress/api-fetch";

/**
 * Add attributes to block so we can later use them to actually filter the post content
 */
function addFilterAttribute(settings) {
  if (typeof settings.attributes === "undefined") {
    settings.attributes = {};
  }

  settings.attributes = Object.assign(settings.attributes, {
    hideOnMobile: {
      type: "boolean",
      default: false,
    },
    onlyLoggedIn: {
      type: "boolean",
      default: false,
    },
    onlyNotLoggedIn: {
      type: "boolean",
      default: false,
    },
    onlyOn: {
      type: "array",
      default: [],
    },
    phpFilters: {
      type: "array",
      default: [],
    },
    phpFilterInverseLogic: {
      type: "boolean",
      default: false,
    },
    roles: {
      type: "array",
      default: [],
    },
    rolesInverseLogic: {
      type: "boolean",
      default: false,
    },
  });

  return settings;
}

// Add the filter to add the extra block attributes
wp.hooks.addFilter(
  "blocks.registerBlockType",
  "tsjippy/content-filter-attribute",
  addFilterAttribute
);

// Fetch the roles over rest api
let availableRoles = [];
document.addEventListener("DOMContentLoaded", () => {
  apiFetch({
    path: `tsjippy/v2/content_filter/get_roles`,
    method: "POST",
  }).then((res) => {
    availableRoles = res || [];
  });
});

// Fetch the allowed php filters over rest api
let allowedPhpFilters = [];
document.addEventListener("DOMContentLoaded", () => {
  apiFetch({
    path: `tsjippy/v2/content_filter/get_allowed_php_filters`,
    method: "POST",
  }).then((res) => {
    allowedPhpFilters = res || [];
  });
});

/**
 * Add controls to panel
 */
const blockFilterControls = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    const { attributes, setAttributes, isSelected, clientId } = props;

    // Ensure array attributes are always fallback-safe arrays
    const onlyOn = attributes.onlyOn || [];
    const phpFilters = attributes.phpFilters || [];
    const roles = attributes.roles || [];

    let children = select("core/block-editor").getBlocksByClientId(clientId);
    if (children.length > 0 && children[0] != null) {
      children = children[0].innerBlocks;
    }

    // Only work on selected blocks
    if (!isSelected) {
      return (
        <Fragment>
          <BlockEdit {...props} />
        </Fragment>
      );
    }

    /**
     * SELECTED PAGES
     */
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPages, setSelectedPages] = useState([]);

    // Selected page list
    const { initialSelectedPages, selectedPagesResolved } = useSelect(
      (selectStore) => {
        const selectedPagesArgs = ["postType", "page", { include: onlyOn }];

        return {
          initialSelectedPages:
            onlyOn.length > 0
              ? selectStore(coreDataStore).getEntityRecords(...selectedPagesArgs)
              : [],
          selectedPagesResolved:
            onlyOn.length > 0
              ? selectStore(coreDataStore).hasFinishedResolution(
                  "getEntityRecords",
                  selectedPagesArgs
                )
              : true,
        };
      },
      [onlyOn]
    );

    /**
     * Search page list
     */
    const { pages, pagesResolved } = useSelect(
      (selectStore) => {
        if (!searchTerm) {
          return {
            pages: [],
            pagesResolved: true,
          };
        }

        const query = {
          exclude: onlyOn,
          search: searchTerm,
          per_page: 100,
          orderby: "relevance",
        };

        const pagesArgs = ["postType", "page", query];

        return {
          pages: selectStore(coreDataStore).getEntityRecords(...pagesArgs) || [],
          pagesResolved: selectStore(coreDataStore).hasFinishedResolution(
            "getEntityRecords",
            pagesArgs
          ),
        };
      },
      [searchTerm, onlyOn]
    );

    const handlePageToggle = (checked, pageId) => {
      if (checked) {
        const newOnlyOn = [...onlyOn, pageId];
        setAttributes({ onlyOn: newOnlyOn });

        const pageToAdd = pages.find((p) => p.id === pageId);
        if (pageToAdd && !selectedPages.some((p) => p.id === pageId)) {
          setSelectedPages([...selectedPages, pageToAdd]);
        }
      } else {
        const newOnlyOn = onlyOn.filter((id) => id !== pageId);
        setAttributes({ onlyOn: newOnlyOn });
      }
    };

    const BuildCheckboxControls = ({ hasResolved, items, showNoResults = true }) => {
      if (!hasResolved) {
        return (
          <>
            <Spinner />
            <br />
          </>
        );
      }

      if (!items || !items.length) {
        if (showNoResults) {
          if (!searchTerm) {
            return null;
          }
          return <div>{__("No search results", "tsjippy")}</div>;
        }
        return null;
      }

      return items.map((page) => (
        <CheckboxControl
          key={page.id}
          label={decodeEntities(page.title?.rendered || "")}
          onChange={(checked) => handlePageToggle(checked, page.id)}
          checked={onlyOn.includes(page.id)}
        />
      ));
    };

    // Sync initial fetched pages to state
    useEffect(() => {
      if (initialSelectedPages) {
        setSelectedPages(initialSelectedPages);
      }
    }, [initialSelectedPages, selectedPagesResolved]);

    // Keep state in sync with current attributes
    useEffect(() => {
      setSelectedPages((prev) => prev.filter((p) => onlyOn.includes(p.id)));
    }, [attributes.onlyOn]);

    /**
     * Update child blocks if parent block filters are modified
     */
    useEffect(() => {
      if (children && children.length > 0) {
        let inherited = {};

        const boolKeys = ["onlyLoggedIn", "onlyNotLoggedIn", "onlyOn"];
        boolKeys.forEach((key) => {
          if (attributes[key]) {
            inherited[key] = attributes[key];
            inherited[key + "Inherited"] = true;
          }
        });

        const arrayKeys = ["phpFilters", "roles"];
        arrayKeys.forEach((key) => {
          if (attributes[key] && attributes[key].length > 0) {
            inherited[key] = attributes[key];
            inherited[key + "Inherited"] = true;
          }
        });

        children.forEach((child) => {
          dispatch("core/block-editor").updateBlockAttributes(
            child.clientId,
            inherited
          );
        });
      }
    }, [
      attributes.hideOnMobile,
      attributes.onlyLoggedIn,
      attributes.onlyNotLoggedIn,
      attributes.onlyOn,
      attributes.phpFilters,
      attributes.phpFilterInverseLogic,
      attributes.roles,
      attributes.rolesInverseLogic,
    ]);

    /**
     * PHP Filters logic
     */
    const onPhpFiltersChanged = (checked, filterName) => {
      let updatedFilters = [...phpFilters];

      if (checked) {
        updatedFilters.push(filterName);
      } else {
        updatedFilters = updatedFilters.filter((f) => f !== filterName);
      }

      setAttributes({ phpFilters: updatedFilters });
    };

    const createFilterControls = () => {
      return allowedPhpFilters.map((filterName) => (
        <CheckboxControl
          key={filterName}
          label={filterName}
          onChange={(checked) => onPhpFiltersChanged(checked, filterName)}
          checked={phpFilters.includes(filterName)}
        />
      ));
    };

    /**
     * Roles logic
     */
    const onRoleSelected = (checked, roleSlug) => {
      let updatedRoles = [...roles];

      if (checked) {
        updatedRoles.push(roleSlug);
      } else {
        updatedRoles = updatedRoles.filter((r) => r !== roleSlug);
      }

      setAttributes({ roles: updatedRoles });
    };

    const createRolesSelectors = () => {
      return availableRoles.map((data) => (
        <CheckboxControl
          key={data.value}
          label={data.label}
          onChange={(checked) => onRoleSelected(checked, data.value)}
          checked={roles.includes(data.value)}
        />
      ));
    };

    const disabledMessage = () => {
      const inheritedAttributes = Object.keys(attributes).filter(
        (k) => k.includes("Inherited") && attributes[k]
      );

      if (inheritedAttributes.length > 0) {
        return <b>{__("Some attributes are set from the parent block...", "tsjippy")}</b>;
      }

      return null;
    };

    return (
      <Fragment>
        <BlockEdit {...props} />
        <InspectorControls>
          <PanelBody
            title={__("Block Visibility", "tsjippy")}
            initialOpen={false}
          >
            {disabledMessage()}

            <Disabled isDisabled={attributes.hideOnMobileInherited}>
              <ToggleControl
                label={__("Hide on mobile", "tsjippy")}
                checked={!!attributes.hideOnMobile}
                onChange={() =>
                  setAttributes({ hideOnMobile: !attributes.hideOnMobile })
                }
              />
            </Disabled>

            <Disabled isDisabled={attributes.onlyLoggedInInherited}>
              <ToggleControl
                label={__("Hide if not logged in", "tsjippy")}
                checked={!!attributes.onlyLoggedIn}
                onChange={() =>
                  setAttributes({ onlyLoggedIn: !attributes.onlyLoggedIn })
                }
              />
            </Disabled>

            <Disabled isDisabled={attributes.onlyNotLoggedInInherited}>
              <ToggleControl
                label={__("Hide if logged in", "tsjippy")}
                checked={!!attributes.onlyNotLoggedIn}
                onChange={() =>
                  setAttributes({ onlyNotLoggedIn: !attributes.onlyNotLoggedIn })
                }
              />
            </Disabled>

            <br />

            <Disabled isDisabled={attributes.phpFiltersInherited}>
              <b>{__("PHP Functions To Apply", "tsjippy")}</b>
              <br />
              {__("Select to hide", "tsjippy")}
              <ToggleControl
                label={__("Inverse Logic", "tsjippy")}
                checked={!!attributes.phpFilterInverseLogic}
                onChange={() =>
                  setAttributes({
                    phpFilterInverseLogic: !attributes.phpFilterInverseLogic,
                  })
                }
              />
              {createFilterControls()}
            </Disabled>

            <Disabled isDisabled={attributes.onlyOnInherited}>
              <strong>{__("Select pages", "tsjippy")}</strong>
              <br />
              {__("Select pages you want this widget to show on", "tsjippy")}.
              <br />
              {__("Leave empty for all pages", "tsjippy")}
              <br />
              <br />

              {onlyOn.length > 0 && (
                <>
                  <i>{__("Currently selected pages", "tsjippy")}:</i>
                  <br />
                  <BuildCheckboxControls
                    hasResolved={selectedPagesResolved}
                    items={selectedPages}
                    showNoResults={false}
                  />
                </>
              )}

              <i>
                {__(
                  "Use searchbox below to search for more pages to include",
                  "tsjippy"
                )}
              </i>
              <SearchControl onChange={setSearchTerm} value={searchTerm} />
              <BuildCheckboxControls
                hasResolved={pagesResolved}
                items={pages}
              />
            </Disabled>

            <Disabled isDisabled={attributes.rolesInherited}>
              <b>{__("Roles Who Can See This Block", "tsjippy")}</b>
              <br />
              <ToggleControl
                label={__("Inverse Logic", "tsjippy")}
                checked={!!attributes.rolesInverseLogic}
                onChange={() =>
                  setAttributes({
                    rolesInverseLogic: !attributes.rolesInverseLogic,
                  })
                }
              />
              {createRolesSelectors()}
            </Disabled>
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  };
}, "blockFilterControls");

wp.hooks.addFilter(
  "editor.BlockEdit",
  "tsjippy/block-filter-controls",
  blockFilterControls
);