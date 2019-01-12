import React, { Component } from 'react'
import { Form, Button, Message, Input } from 'semantic-ui-react'
import Campaign from '../../../ethereum/campaign'
import web3 from '../../../ethereum/web3'
import { Link, Router } from '../../../routes'
import Layout from '../../../components/Layout'

class RequestNew extends Component {
    state = {
        value: '',
        description: '',
        recipient: '',
        loading: false,
        error: ''
    }

    static async getInitialProps(props) {
        const { address } = props.query
        return { address }
    }

    onSubmit = async event => {
        event.preventDefault()
        // Start loading & clear error
        this.setState({ loading: true, error: '' })
        // Try creating the request on the contract
        try {
            const campaign = Campaign(this.props.address)
            const accounts = await web3.eth.getAccounts()
            const { description, value, recipient } = this.state
            await campaign.methods
                .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
                .send({ from: accounts[0] })
            // Redirect to requests list
            Router.pushRoute(`/campaigns/${this.props.address}/requests`)
        } catch (err) {
            // Display error
            this.setState({ error: err.message })
        }
        // Stop loading
        this.setState({ loading: false })
    }

    render() {
        return (
            <Layout>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                    <a>Back</a>
                </Link>
                <h3>Create a Request</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.error}>
                    <Form.Field>
                        <label>Description</label>
                        <Input
                            value={this.state.description}
                            onChange={event =>
                                this.setState({ description: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Value in Ether</label>
                        <Input
                            value={this.state.value}
                            onChange={event => this.setState({ value: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Recipient</label>
                        <Input
                            value={this.state.recipient}
                            onChange={event =>
                                this.setState({ recipient: event.target.value })}
                        />
                    </Form.Field>

                    <Message error header="Oops!" content={this.state.error} />
                    <Button primary loading={this.state.loading} disabled={this.state.loading}>
                        Create!
                    </Button>
                </Form>
            </Layout>
        )
    }
}

export default RequestNew