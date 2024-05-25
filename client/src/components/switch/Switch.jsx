import PropTypes from 'prop-types';

const Switch = ({ label, isChecked, onToggle }) => {
    return (
        <div className="switch">
            <label>
                {label}
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={onToggle}
                />
                <span className="slider"></span>
            </label>
        </div>
    );
};

Switch.propTypes = {
    label: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
};

export default Switch;