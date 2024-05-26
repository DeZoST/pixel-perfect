import styles from './Switch.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Switch = ({ className, onToggle }) => {

  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
    onToggle(!isOn);
  };

  return (
    <div className={`${styles.switchContainer} ${className}`}>
      <span>Mode Modérateur</span>
      <div className={`${styles.switch} ${isOn ? styles.on : styles.off}`} onClick={toggleSwitch}>
        <div className={`${styles.switchToggle}`}></div>
      </div>
    </div>
  );
};

Switch.propTypes = {
  className: PropTypes.string
};

export default Switch;