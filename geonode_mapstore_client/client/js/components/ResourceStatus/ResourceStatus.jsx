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
            return <span className="gn-resource-status" style={{backgroundColor: "#FB8C00", color:"white"}}><Message msgId="bhumi.need_approval" /></span>;
        }else if(upload_rejected){
            return <span className="gn-resource-status gn-resource-status-danger"><Message msgId="bhumi.upload_rejected" /></span>;
        }else if(publish_rejected){
            return <span className="gn-resource-status gn-resource-status-danger"><Message msgId="bhumi.publish_rejected" /></span>;
        }else if (approved && !published) {
            return <span className="gn-resource-status gn-resource-status-success"><Message msgId="bhumi.approved" /></span>;
        }else if (approved && published) {
            return <span className="gn-resource-status gn-resource-status-success"><Message msgId="bhumi.published" /></span>;
        }

        return <span className="gn-resource-status" style={{backgroundColor: "#03A9F4", color:"white"}}><Message msgId="bhumi.uploaded" /></span>;
    };
    
    var source_type = resource.sourcetype;
    var source_type_color = "#737373";

    for(const link of resource.links){
        if(link.extras) {
            source_type = link.extras.content.type.toUpperCase();
        }
    }

    switch(source_type){
        case "GEOJSON": source_type_color = "#FFC107"; break;
        case "TIFF": source_type_color = "#FF9800"; break;
        case "SHP": source_type_color = "#2196F3"; break;
        case "REMOTE": source_type_color = "#9C27B0"; break;
        case "CSV": source_type_color = "#4CAF50"; break;
    }

    return !isEmpty(resource)
        ? (
            <p className="gn-resource-status-text">
                <span className="gn-resource-status" style={{backgroundColor: source_type_color, color: "white"}}>{source_type}</span>
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
