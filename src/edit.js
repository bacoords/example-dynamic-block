/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";

import {
	Panel,
	PanelBody,
	PanelRow,
	SelectControl,
} from "@wordpress/components";

// Method 1: Importing the server-side-render component.
// import ServerSideRender from "@wordpress/server-side-render";

// Method 2: Building a client-side component.
import { useEntityRecords } from "@wordpress/core-data";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	// Method 2: Fetching the data using the core-data package.
	const { records, isResolving } = useEntityRecords("root", "user", {
		per_page: 12,
		roles: attributes.role,
	});

	return (
		<ul {...useBlockProps()}>
			<InspectorControls>
				<Panel>
					<PanelBody title={__("Settings", "wpdev")} initialOpen={true}>
						<PanelRow>
							<SelectControl
								label={__("User Role", "wpdev")}
								value={attributes.role}
								options={[
									{ label: __("Contributor", "wpdev"), value: "contributor" },
									{ label: __("Author", "wpdev"), value: "author" },
									{ label: __("Editor", "wpdev"), value: "editor" },
									{
										label: __("Administrator", "wpdev"),
										value: "administrator",
									},
								]}
								onChange={(role) => setAttributes({ role })}
							/>
						</PanelRow>
					</PanelBody>
				</Panel>
			</InspectorControls>

			{/* // Method 1: Using the server-side-render component. */}
			{/* <ServerSideRender
				block="wpdev/example-dynamic-block"
				attributes={attributes}
			/> */}

			{/* // Method 2: Using a client-side component. */}
			{records && (
				<>
					{records.map((record) => (
						<li key={record.id}>
							<a href={record.link}>
								<img
									src={record.avatar_urls[48]}
									alt={`Profile image of ${record.nickname}`}
								/>{" "}
								{record.nickname}
							</a>
						</li>
					))}
				</>
			)}
		</ul>
	);
}
