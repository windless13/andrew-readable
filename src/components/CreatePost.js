import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router';
import { connect } from 'react-redux';

import { COLORS } from '../constants.js';
import { addPost, editPost } from '../actions';
import {
    TextInput,
    TextAreaInput,
    Select,
    FormButtons,
} from './form-inputs';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 300px;
    margin: 20px 40px;
`;

class CreatePost extends React.Component {
    constructor(props) {
        super(props);

        const { edit } = props;

        this.state = {
            id: (edit && edit.id) || null,
            timestamp: (edit && edit.title) || null,
            title: (edit && edit.title) || '',
            body: (edit && edit.body) || '',
            author: (edit && edit.author) || '',
            category: (edit && edit.category) || '',
            redirect: false,
            errors: {
                title: false,
                author: false,
                body: false,
                category: false,
            },
        };

        this.handleBody = this.handleBody.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.handleAuthor = this.handleAuthor.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.updateErrors = this.updateErrors.bind(this);
    }

    handleBody(event) {
        this.setState({
            body: event.target.value,
        });
    }

    handleTitle(event) {
        this.setState({
            title: event.target.value,
        });
    }

    handleCategory(event) {
        this.setState({
            category: event.target.value,
        });
    }

    handleAuthor(event) {
        this.setState({
            author: event.target.value,
        });
    }

    handleSubmitForm(event) {
        const { edit, addPost, editPost } = this.props;
        const { id, author, category, body, title, timestamp } = this.state;

        if (this.validateForm()) {
            if (edit) {
                editPost(id, title, body);
            } else {
                addPost(title, author, body, category);
            }
            this.setState({
                redirect: true,
            });
        }
    }

    handleClearForm(event) {
        if (this.props.edit) {
            this.setState({
                body: '',
                title: '',
            });
        } else {
            this.setState({
                body: '',
                title: '',
                category: '',
                author: '',
            });
        }
    }

    validateForm() {
        const { author, category, body, title } = this.state;

        this.setState({
            errors: {
                title: _.isEmpty(title),
                body: _.isEmpty(body),
                author: _.isEmpty(author),
                category: _.isEmpty(category),
            },
        });

        return !_.isEmpty(title)
            && !_.isEmpty(body)
            && !_.isEmpty(author)
            && !_.isEmpty(category);
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
        const { edit, categories } = this.props;

        const {
            id,
            timestamp,
            title,
            author,
            body,
            category,
            redirect,
            errors,
        } = this.state;

        // Redirect to category page after post is created
        if (redirect) {
            return (
                <Redirect to={`/${category}`} />
            );
        }

        return (
            <Wrapper>
                <TextInput
                    label='Title'
                    value={title}
                    onChange={this.handleTitle}
                    errors={errors}
                    updateErrors={this.updateErrors}
                />

                { !edit &&
                    <TextInput
                        label='Author'
                        value={author}
                        onChange={this.handleAuthor}
                        errors={errors}
                        updateErrors={this.updateErrors}
                    />
                }

                { !edit &&
                    <Select
                        label='Category'
                        value={category}
                        onChange={this.handleCategory}
                        categories={categories}
                        errors={errors}
                        updateErrors={this.updateErrors}
                    />
                }

                <TextAreaInput
                    label='Post'
                    value={body}
                    onChange={this.handleBody}
                    errors={errors}
                    updateErrors={this.updateErrors}
                />

                <FormButtons
                    handleClearForm={this.handleClearForm}
                    handleSubmitForm={this.handleSubmitForm}
                    edit={edit}
                />
            </Wrapper>
        );
    }
}

CreatePost.propTypes = {
    edit: PropTypes.shape(),
};

function mapStateToProps ({ post, comment }) {
    return {
        posts: post.posts,
        categories: post.categories,
    };
}

const mapDispatchToProps = { addPost, editPost };

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CreatePost));
