import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { addComment, editComment } from '../actions';
import { withRouter, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { COLORS } from '../constants.js';
import * as ReadableAPI from '../ReadableAPI.js';
import {
    TextInput,
    TextAreaInput,
    Select,
} from './form-inputs';
export const InputLabel = styled.div`
    padding: 10px 0;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const SubmitFormButton = styled.button`
`;


const ClearForm = styled.button`
`;

const Navigation = styled.div`
    display: flex;
    justify-content: space-between;
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

        debugger;

        if (this.validateForm()) {
            if (edit) {
                ReadableAPI.editComment(id, body).then((result) => {
                    editComment({ id, timestamp, body });
                });
                onClose();
            } else {
                ReadableAPI.addCommentToPost(null, null, postId, body, author).then((result) => {
                    addComment({
                        id: result.id,
                        timestamp: result.timestamp,
                        postId,
                        author,
                        body,
                    });
                    this.handleClearForm();
                });
            }
        }
    }

    handleClearForm() {
        this.setState({
            body: '',
            author: '',
        });
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
                    label='Post'
                    value={body}
                    onChange={this.handleBody}
                    errors={errors}
                    updateErrors={this.updateErrors}
                />

                {!edit &&
                    <TextInput
                        label='Author'
                        value={author}
                        onChange={this.handleAuthor}
                        errors={errors}
                        updateErrors={this.updateErrors}
                    />
                }

                <Navigation>
                    <SubmitFormButton onClick={this.handleSubmitForm}>
                        { this.props.edit    ? 'Save' : 'Submit' }
                    </SubmitFormButton>
                    <ClearForm
                        className="btn btn-link float-left"
                        onClick={this.handleClearForm}
                    >
                        Clear form
                    </ClearForm>
                </Navigation>
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

function mapDispatchToProps (dispatch) {
    return {
        addComment: (data) => dispatch(addComment(data)),
        editComment: (data) => dispatch(editComment(data)),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateComment));
