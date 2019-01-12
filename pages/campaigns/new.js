import React, { Component } from 'react'
import { Form, Button, Input, Message } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'
import { Router } from '../../routes'

class CampaignNew extends Component {
    state = {
        minimumContribution: '',
        error: '',
        loading: false
    }

    onSubmit = async (event) => {
        event.preventDefault()
        // Start loading & remove error
        this.setState({ loading: true, error: '' })
        // Try creating a campaign
        try {
            const accounts = await web3.eth.getAccounts()
            await factory.methods.createCampaign(this.state.minimumContribution)
                .send({
                    from: accounts[0]
                })
            // Redirect to root
            Router.pushRoute('/')
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
                <h3>Create a campaign</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.error}>
                    <Form.Field>
                        <label>Minimum contribution</label>
                        <Input label="wei" labelPosition="right" value={this.state.minimumContribution}
                            onChange={event => this.setState({ minimumContribution: event.target.value })} />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.error} />
                    <Button primary loading={this.state.loading} disabled={this.state.loading}>Create</Button>
                </Form>
            </Layout>
        )
    }

}

export default CampaignNew