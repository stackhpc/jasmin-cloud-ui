/**
 * This module contains components for the tenancy machines page.
 */

import React from 'react';
import { Redirect } from 'react-router-dom';

import get from 'lodash/get';

import { ResourcePanel } from './resource-utils';
import { ClustersTable } from './clusters-table';
import { CreateClusterButton } from './create-cluster-modal';


const Clusters = ({ resourceData, resourceActions, ...props }) => (
    <ClustersTable
      clusters={resourceData}
      clusterActions={resourceActions}
      {...props} />
);


export class TenancyClustersPanel extends React.Component {
    setPageTitle(props) {
        document.title = `Clusters | ${props.tenancy.name} | JASMIN Cloud Portal`;
    }

    componentDidMount = () => this.setPageTitle(this.props)
    componentDidUpdate = (props) => this.setPageTitle(props)

    render() {
        const { tenancy, tenancyActions } = this.props;
        if( !get(tenancy.clusters, 'enabled', true) ) {
            return <Redirect to={`/tenancies/${tenancy.id}`} />;
        }
        return (
            <ResourcePanel
              resource={tenancy.clusters}
              resourceActions={tenancyActions.cluster}
              resourceName="clusters"
              createButtonComponent={CreateClusterButton}
              createButtonExtraProps={({ tenancy })}>
                <Clusters tenancy={tenancy} />
            </ResourcePanel>
        );
    }
}
