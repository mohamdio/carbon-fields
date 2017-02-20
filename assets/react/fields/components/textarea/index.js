/**
 * The external dependencies.
 */
import React, { PropTypes } from 'react';
import { compose, withHandlers, setStatic } from 'recompose';

/**
 * The internal dependencies.
 */
import Field from 'fields/components/field';
import withStore from 'fields/decorators/with-store';
import withSetup from 'fields/decorators/with-setup';
import { TYPE_TEXTAREA, TYPE_HEADER_SCRIPTS, TYPE_FOOTER_SCRIPTS } from 'fields/constants';

/**
 * Render a multiline text input field.
 *
 * @param  {Object}   props
 * @param  {String}   props.name
 * @param  {Object}   props.field
 * @param  {Function} props.handleChange
 * @return {React.Element}
 */
export const TextareaField = ({ name, field, handleChange }) => {
	return <Field field={field}>
		<textarea
			id={field.id}
			name={name}
			value={field.value}
			rows={field.rows}
			disabled={!field.ui.is_visible}
			onChange={handleChange} />
	</Field>;
};

/**
 * Validate the props.
 *
 * @type {Object}
 */
TextareaField.propTypes = {
	name: PropTypes.string.isRequired,
	field: PropTypes.shape({
		id: PropTypes.string.isRequired,
		value: PropTypes.string,
		rows: PropTypes.number,
	}).isRequired,
	handleChange: PropTypes.func.isRequired,
};

/**
 * Sync the input value with the store.
 *
 * @param  {Object}   props
 * @param  {Object}   props.field
 * @param  {Function} props.updateField
 * @return {Function}
 */
const handleChange = ({ field, updateField }) => ({ target: { value } }) => updateField(field.id, { value });

export default setStatic('type', [
	TYPE_TEXTAREA,
	TYPE_HEADER_SCRIPTS,
	TYPE_FOOTER_SCRIPTS
])(
	compose(
		withStore(),
		withSetup(),
		withHandlers({ handleChange })
	)(TextareaField)
);