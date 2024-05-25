import PropTypes from 'prop-types';

const WaitingMessage = ({ message }) => {
    return (
        <div className="waiting-message">
            <p>{message}</p>
        </div>
    );
};

WaitingMessage.propTypes = {
    message: PropTypes.string.isRequired,
};

export default WaitingMessage;