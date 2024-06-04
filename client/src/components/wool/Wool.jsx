import PropTypes from "prop-types"

const Wool = ({color}) => {
    return <img src={`/images/wool-${color}.png`} alt="wool for voting" />
}

Wool.propTypes = {
    color: PropTypes.string.isRequired,
}

export default Wool
