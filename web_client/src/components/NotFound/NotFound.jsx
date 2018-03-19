import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const NotFound = ({ className }) => (
    <div className={className}>
        <p>Home</p>
    </div>
)

NotFound.propTypes = {
    className: PropTypes.string,
};

export default styled(NotFound) `

`;
