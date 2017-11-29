import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { addPost } from '../actions';
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

const SubmitForm = styled.input`
`;


const ClearForm = styled.button`
`;

const Navigation = styled.div`
    display: flex;
    justify-content: space-between;
`;

class CreatePost extends React.Component {
    constructor(props) {
        super(props);

        const {
            id,
            timestamp,
            title,
            author,
            body,
            category,
        } = props;

        this.state = {
            title,
            body,
            author,
            category,
            categories: [],
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

    componentWillMount() {
        ReadableAPI.getCategories().then((result) => {
            this.setState({ categories: _.map(result, 'name') });
        });
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
        const { id, author, category, body, title, timestamp } = this.state;


        ReadableAPI.addPost(null, null, title, author, body, category).then((result) => {
            this.props.addPost({
                id: result.id,
                timestamp: result.timestamp,
                title,
                body,
                author,
                category,
            });

            this.setState({
                redirect: true,
            });
        });
    }

    handleClearForm(event) {
        this.setState({
            body: '',
            title: '',
            category: '',
            author: '',
        });
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
        const {
            id,
            timestamp,
            title,
            author,
            body,
            category,
            redirect,
            categories,
            errors,
        } = this.state;

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
                    error={errors}
                    updateErrors={updateErrors}
                />

                <TextInput
                    label='Author'
                    value={author}
                    onChange={this.handleAuthor}
                    error={errors}
                    updateErrors={updateErrors}
                />

                <Select
                    label='Categoryz'
                    value={category}
                    onChange={this.handleCategory}
                    categories={categories}
                    errors={errors}
                    updateErrors={updateErrors}
                />

                <TextAreaInput
                    label='Post'
                    value={body}
                    onChange={this.handleBody}
                    error={errors}
                    updateErrors={updateErrors}
                />

                <Navigation>
                    <SubmitForm
                        type="submit"
                        className="btn btn-primary float-right"
                        value="Submit"
                        onClick={this.handleSubmitForm}

                    />
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

CreatePost.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    body: PropTypes.string,
    category: PropTypes.string,
    timestamp: PropTypes.number,
    isNew: PropTypes.bool,
};

function mapDispatchToProps (dispatch) {
    return {
        addPost: (data) => dispatch(addPost(data)),
    }
}

export default withRouter(connect(
    null,
    mapDispatchToProps
)(CreatePost));
