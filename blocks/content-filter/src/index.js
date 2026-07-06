import { __ } from "@wordpress/i18n";
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, ToggleControl, CheckboxControl } = wp.components;
import {
  SearchControl,
  Spinner,
  __experimentalInputControl as InputControl,
} from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { store as coreDataStore } from "@wordpress/core-data";
import { decodeEntities } from "@wordpress/html-entities";
import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";

console.log("block filter loaded");

/**
 * Add attributes to block so we can later use them to actually folter the post content
 */
function addFilterAttribute(settings) {
  if (typeof settings.attributes !== "undefined") {
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
  }
  return settings;
}

// Add the filter to add the extra block attributes
wp.hooks.addFilter(
  "blocks.registerBlockType",
  "tsjippy/content-filter-attribute",
  addFilterAttribute,
);

// Fetch the roles over rest api
var availableRoles = [];
document.addEventListener("DOMContentLoaded", () => {
  apiFetch({
    path: tsjippy.restApiPrefix + `/content_filter/get_roles`,
    method: "POST",
  }).then((res) => {
    availableRoles = res;
  });
});

// Fetch the allowed php filters over rest api
var allowedPhpFilters = [];
document.addEventListener("DOMContentLoaded", () => {
  apiFetch({
    path: tsjippy.restApiPrefix + `/content_filter/get_allowed_php_filters`,
    method: "POST",
  }).then((res) => {
    allowedPhpFilters = res;
  });
});

/**
 * Add controls to panel
 */
const blockFilterControls = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    const { attributes, setAttributes, isSelected } = props;

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
    // Define a variable and a function to update that variable
    const [searchTerm, setSearchTerm] = useState("");

    // Selected page list
    const { initialSelectedPages, selectedPagesResolved } = useSelect(
      (select) => {
        let onlyOn = attributes.onlyOn;

        // Find all selected pages
        const selectedPagesArgs = ["postType", "page", { include: onlyOn }];

        return {
          initialSelectedPages: select(coreDataStore).getEntityRecords(
            ...selectedPagesArgs,
          ),
          selectedPagesResolved: select(coreDataStore).hasFinishedResolution(
            "getEntityRecords",
            selectedPagesArgs,
          ),
        };
      },
      [],
    );

    /**
     * Search page list
     */
    const { pages, pagesResolved } = useSelect(
      (select) => {
        // do not show results if not searching
        if (!searchTerm) {
          return {
            pages: [],
            pagesResolved: true,
          };
        }

        let onlyOn = attributes.onlyOn;

        // find all pages excluding the already selected pages
        const query = {
          exclude: onlyOn,
          search: searchTerm,
          per_page: 100,
          orderby: "relevance",
        };

        const pagesArgs = ["postType", "page", query];

        return {
          pages: select(coreDataStore).getEntityRecords(...pagesArgs),
          pagesResolved: select(coreDataStore).hasFinishedResolution(
            "getEntityRecords",
            pagesArgs,
          ),
        };
      },
      [searchTerm],
    );

    const PageSelected = function (checked) {
      let onlyOn = attributes.onlyOn;

      if (checked) {
        // Add to stored page ids
        setAttributes({ onlyOn: [...onlyOn, this] });

        // Add to selected pages list
        setSelectedPages([...selectedPages, pages.find((p) => p.id == this)]);
      } else {
        onlyOn = onlyOn.filter((p) => {
          return p != this;
        });

        if (onlyOn.length == 0) {
          onlyOn = undefined;
        }
        setAttributes({ onlyOn: onlyOn });
      }
    };

    const GetSelectedPagesControls = function () {
      let onlyOn = attributes.onlyOn;

      if (onlyOn.length > 0) {
        return (
          <>
            <i> {__("Currently selected pages", "tsjippy")}:</i>
            <br></br>

            <BuildCheckboxControls
              hasResolved={selectedPagesResolved}
              items={initialSelectedPages}
              showNoResults={false}
            />
          </>
        );
      } else {
        return "";
      }
    };

    const BuildCheckboxControls = function ({
      hasResolved,
      items,
      showNoResults = true,
    }) {
      if (!hasResolved) {
        return (
          <>
            <Spinner />
            <br></br>
          </>
        );
      }

      if (!items?.length) {
        if (showNoResults) {
          if (!searchTerm) {
            return "";
          }
          return <div> {__("No search results", "tsjippy")}</div>;
        }

        return "";
      }

      return items?.map((page) => {
        let onlyOn = attributes.onlyOn;

        return (
          <CheckboxControl
            label={decodeEntities(page.title.rendered)}
            onChange={PageSelected.bind(page.id)}
            checked={onlyOn.includes(page.id)}
          />
        );
      });
    };

    const [selectedPages, setSelectedPages] = useState([]);

    const [selectedPagesControls, setSelectedPagesControls] = useState(
      GetSelectedPagesControls(),
    );

    // Update selectedPagesControls on page resolve
    useEffect(() => {
      setSelectedPages(initialSelectedPages);
    }, [selectedPagesResolved]);

    // Update selectedPagesControls on check/uncheck
    useEffect(() => {
      setSelectedPages(
        selectedPages.filter((p) => {
          return attributes.onlyOn.includes(p.id);
        }),
      );
    }, [attributes.onlyOn]);

    useEffect(() => {
      setSelectedPagesControls(
        BuildCheckboxControls({
          hasResolved: selectedPagesResolved,
          items: selectedPages,
          showNoResults: false,
        }),
      );
    }, [selectedPages]);

    /**
     * PHP Filters
     */
    const createFilterControls = function () {
      return [
        allowedPhpFilters.map((data) => {
          return (
            <CheckboxControl
              key={data}
              label={data}
              onChange={(checked) =>
                onPhpFiltersChanged(
                  checked,
                  data,
                )
              }
              checked={attributes.phpFilters.indexOf(data) > -1}
            />
          );
        }),
      ];
    };

    const onPhpFiltersChanged = function (checked, filterName) {
      let phpFilters = attributes.phpFilters;

      // A role just got selected
      if (checked) {
        // Add to stored roles
        phpFilters.push(filterName);
      } else {
        // remove from array
        phpFilters = phpFilters.filter((p) => {
          return p != filterName;
        });
      }

      // Store in Attributes
      // We need to set a new array to trigger a re-render
      setAttributes({ phpFilters: [...phpFilters] });
    };

    /**
     * ROLES
     */
    const createRolesSelectors = () => {
      return [
        availableRoles.map((data) => {
          return (
            <CheckboxControl
              key={data.value}
              label={data.label}
              onChange={(checked) =>
                onRoleSelected(
                  checked,
                  data.value,
                )
              }
              checked={attributes.roles.indexOf(data.value) > -1}
            />
          );
        }),
      ];
    };

    /**
     * Runs when a role gets (de)selected
     * @param {bool} checked true when selected, false otherwise
     */
    const onRoleSelected = function (checked, roleSlug) {
      let roles = attributes.roles;

      // A role just got selected
      if (checked) {
        // Add to stored roles
        roles.push(roleSlug);
      } else {
        // remove from array
        roles = roles.filter((p) => {
          return p != roleSlug;
        });
      }

      // Store in Attributes
      // Store as a new array to trigger a new render
      setAttributes({ roles: [...roles] });

    };

    /**
     * Actual Rendering
     */
    return (
      <Fragment>
        <BlockEdit {...props} />
        <InspectorControls>
          <PanelBody
            title={__("Block Visibility", "tsjippy")}
            initialOpen={false}
          >
            <ToggleControl
              label={__("Hide on mobile", "tsjippy")}
              checked={!!attributes.hideOnMobile}
              onChange={() =>
                setAttributes({ hideOnMobile: !attributes.hideOnMobile })
              }
            />
            <ToggleControl
              label={__("Hide if not logged in", "tsjippy")}
              checked={!!attributes.onlyLoggedIn}
              onChange={() =>
                setAttributes({ onlyLoggedIn: !attributes.onlyLoggedIn })
              }
            />
            <ToggleControl
              label={__("Hide if logged in", "tsjippy")}
              checked={!!attributes.onlyNotLoggedIn}
              onChange={() =>
                setAttributes({ onlyNotLoggedIn: !attributes.onlyNotLoggedIn })
              }
            />
            <b>{__("PHP Functions To Apply", "tsjippy")}</b>
            <br></br>
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
            <strong>{__("Select pages", "tsjippy")}</strong>
            <br></br>
            {__("Select pages you want this widget to show on", "tsjippy")}.
            <br></br>
            {__("Leave empty for all pages", "tsjippy")}
            <br></br>
            <br></br>
            {selectedPagesControls}
            <i>
              {__(
                "Use searchbox below to search for more pages to include",
                "tsjippy",
              )}
            </i>
            <SearchControl onChange={setSearchTerm} value={searchTerm} />
            <BuildCheckboxControls hasResolved={pagesResolved} items={pages} />
            <b>{__("Roles Who Can See This Block", "tsjippy")}</b>
            <br></br>
            <ToggleControl
              label={__("Inverse Logic", "tsjippy")}
              checked={!!attributes.rolesInverseLogic}
              onChange={() =>
                setAttributes({
                  rolesInverseLogic: !attributes.rolesInverseLogic,
                })
              }
            />
            { createRolesSelectors() }
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  };
}, "blockFilterControls");

wp.hooks.addFilter(
  "editor.BlockEdit",
  "tsjippy/block-filter-controls",
  blockFilterControls,
);
