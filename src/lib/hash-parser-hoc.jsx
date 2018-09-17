import React from 'react';
import bindAll from 'lodash.bindall';

import {newDefaultProjectId} from '../reducers/project-id';

/* Higher Order Component to get the project id from location.hash
 * @param {React.Component} WrappedComponent component to receive projectData prop
 * @returns {React.Component} component with project loading behavior
 */
const HashParserHOC = function (WrappedComponent) {
    class HashParserComponent extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, [
                'handleHashChange'
            ]);
            this.state = {
                projectId: null
            };
        }
        componentDidMount () {
            window.addEventListener('hashchange', this.handleHashChange);
            this.handleHashChange();
        }
        componentWillUnmount () {
            window.removeEventListener('hashchange', this.handleHashChange);
        }
        handleHashChange () {
            const hashMatch = window.location.hash.match(/#(\d+)/);
            const projectId = hashMatch === null ? newDefaultProjectId : hashMatch[1];
            if (projectId !== this.state.projectId) {
                this.setState({projectId: projectId});
            }
        }
        render () {
            return (
                <WrappedComponent
                    hideIntro={this.state.projectId && this.state.projectId !== 0}
                    projectId={this.state.projectId}
                    {...this.props}
                />
            );
        }
    }

    return HashParserComponent;
};

export {
    HashParserHOC as default
};
