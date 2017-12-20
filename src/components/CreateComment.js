import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router';
import { connect } from 'react-redux';

import { COLORS, COMMENT_WIDTH } from '../constants.js';
import { addComment, editComment } from '../actions';
import {
    TextInput,
    TextAreaInput,
    Select,
    FormButtons,
} from './form-inputs';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-width: ${COMMENT_WIDTH};
`;

class CreateComment extends React.Component {
    constructor(props) {
        super(props);

        const { edit } = props;
        this.state = {
            id: (edit && edit.id) || null,
            timestamp: (edit && edit.timestamp) || null,
            body: (edit && edit.body) || '',
            author: (edit && edit.author) || '',
            errors: {
                author: false,
                body: false,
            },
        };

        this.handleBody = this.handleBody.bind(this);
        this.handleAuthor = this.handleAuthor.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.updateErrors = this.updateErrors.bind(this);
    }

    handleBody(event) {
        console.log(event.target.value);
        this.setState({
            body: event.target.value,
        });
    }

    handleAuthor(event) {
        this.setState({
            author: event.target.value,
        });
    }

    handleSubmitForm(event) {
        const { postId, addComment, editComment, onClose, edit } = this.props;
        const { id, author, body, timestamp } = this.state;

        if (this.validateForm()) {
            if (edit) {
                // Edit the selected comment
                editComment(id, body);
                onClose();
            } else {
                // Create new comment
                addComment(postId, body, author);
                this.handleClearForm();
            }
        }
    }

    handleClearForm() {
        if (this.props.edit) {
            this.setState({
                body: '',
            });
        } else {
            this.setState({
                body: '',
                author: '',
            });
        }
    }

    validateForm() {
        const { author, category, body, title } = this.state;

        this.setState({
            errors: {
                body: _.isEmpty(body),
                author: _.isEmpty(author),
            },
        });

        return !_.isEmpty(body)
            && !_.isEmpty(author);
    }

    updateErrors(input, error) {
        this.setState({
            errors: {
                ...this.state.errors,
                [input]: error,
            },
        });
    }

    render() {
        const { edit } = this.props;
        const {
            id,
            timestamp,
            author,
            body,
            errors,
        } = this.state;

        return (
            <Wrapper>
                <TextAreaInput
                    label='Comment'
                    value={body}
                    onChange={this.handleBody}
                    errors={errors}
                    updateErrors={this.updateErrors}
                />

                {!edit &&
                    <TextInput
                        label='Your name'
                        value={author}
                        onChange={this.handleAuthor}
                        errors={errors}
                        updateErrors={this.updateErrors}
                    />
                }

                <FormButtons
                    handleClearForm={this.handleClearForm}
                    handleSubmitForm={this.handleSubmitForm}
                    edit={edit}
                />
            </Wrapper>
        );
    }
}

CreateComment.propTypes = {
    edit: PropTypes.shape(),
    postId: PropTypes.string,
    onClose: PropTypes.func,
};

function mapStateToProps ({ post, comment }) {
    return {
        posts: post.posts,
    };
}

const mapDispatchToProps = { addComment, editComment };

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateComment));
