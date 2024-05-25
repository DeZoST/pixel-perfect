import PropTypes from 'prop-types';

const Title = ({ level, title, subtitle }) => {
    const Tag = `h${level}`;
    return (
    <div className="title">
        <Tag>{title}</Tag>
        {subtitle && <h2>{subtitle}</h2>}
        <div className="underline"></div>
    </div>
    );
}

Title.propTypes = {
    level: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
  };

export default Title;