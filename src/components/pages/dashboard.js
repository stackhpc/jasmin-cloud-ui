/**
 * This module contains the component for rendering the tenancies dashboard.
 */

import isEmpty from 'lodash/isEmpty';

import React from 'react';
import { PageHeader, Row, Col, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { Loading } from '../utils';


export class Dashboard extends React.Component {
    componentDidMount() {
        document.title = 'Dashboard | JASMIN Cloud Portal';
    }

    render() {
        const { fetching, data: tenancies } = this.props.tenancies;
        if( !isEmpty(tenancies || {}) ) {
            // Sort the tenancies by name before rendering
            const sorted = Object.values(tenancies)
                .sort((x, y) => x.name < y.name ? -1 : (x.name > y.name ? 1 : 0));
            return (
                <div>
                    <PageHeader>Dashboard</PageHeader>
                    <Row>
                        <Col md={6} mdOffset={3}>
                            <Panel>
                                <Panel.Heading>Available tenancies</Panel.Heading>
                                <ListGroup fill="true">
                                    {sorted.map((t) =>
                                        <LinkContainer
                                          key={t.id}
                                          to={`/tenancies/${t.id}`}>
                                            <ListGroupItem>{t.name}</ListGroupItem>
                                        </LinkContainer>
                                    )}
                                </ListGroup>
                            </Panel>
                        </Col>
                    </Row>
                </div>
            );
        }
        else if( fetching ) {
            return <Loading message="Loading tenancies..." />;
        }
        else {
            return (
                <div>
                    <PageHeader>Dashboard</PageHeader>
                    <Row>
                        <Col md={6} mdOffset={3}>
                            <Panel>
                                <Panel.Heading>Available tenancies</Panel.Heading>
                                You do not belong to any tenancies.
                            </Panel>
                        </Col>
                    </Row>
                </div>
            );
        }
    }
}
