/*
 * Copyright 2021, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import Message from '@mapstore/framework/components/I18N/Message';
import PropTypes from 'prop-types';
import FaIcon from '@js/components/FaIcon';
import tooltip from '@mapstore/framework/components/misc/enhancers/tooltip';
import isEmpty from 'lodash/isEmpty';
import { getResourceStatuses } from '@js/utils/ResourceUtils';
import Button from '@js/components/Button';

const ButtonWithTooltip = tooltip(Button);

const ResourceStatus = ({ resource = {} }) => {
    const {
        isApproved,
        isPublished,
        isApprovalRequested,
        isUploadRejected,
        isPublishRejected,
        isProcessing,
        isCopying,
        isDeleting,
        isDeleted
    } = getResourceStatuses(resource);

    const getTitle = (status) => {
        const { isApproved: approved, isPublished: published, isApprovalRequested: approval_requested, isUploadRejected: upload_rejected, isPublishRejected: publish_rejected } = status;

        if (approval_requested) {
            return <span className="gn-resource-status" style="background-color: #E65100; color: white;">Need Approval</span>;
        }else if(upload_rejected){
            return <span className="gn-resource-status gn-resource-status-danger">Upload Rejected</span>;
        }else if(publish_rejected){
            return <span className="gn-resource-status gn-resource-status-danger">Publish Rejected</span>;
        }else if (approved && !published) {
            return <span className="gn-resource-status gn-resource-status-success">Approved</span>;
        }else if (approved && published) {
            return <span className="gn-resource-status gn-resource-status-success">Published</span>;
        }

        return <span className="gn-resource-status" style="background-color: #03A9F4; color:white;">Uploaded</span>;
    };

    return !isEmpty(resource)
        ? (
            <p className="gn-resource-status-text">
                {
                    (!isProcessing) &&
                        getTitle({ isApproved, isPublished, isApprovalRequested, isUploadRejected, isPublishRejected })
                }
                {isDeleting && <span className="gn-resource-status gn-resource-status-danger" >
                    <Message msgId="gnviewer.deleting" />
                </span>}
                {isDeleted && <span className="gn-resource-status gn-resource-status-danger" >
                    <Message msgId="gnviewer.deleted" />
                </span>}
                {isCopying && <span className="gn-resource-status gn-resource-status-primary" >
                    <Message msgId="gnviewer.cloning" />
                </span>}
            </p>
        )
        : null;
};

ResourceStatus.propTypes = {
    isApproved: PropTypes.bool,
    isPublished: PropTypes.bool
};

ResourceStatus.defaultProps = {
    isApproved: true,
    isPublished: true
};


export default ResourceStatus;
