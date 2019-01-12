import React, { Component } from 'react'
import { Form, Input, Message, Button } from 'semantic-ui-react'
import Campaign from '../ethereum/campaign'
import web3 from '../ethereum/web3'
import { Router } from '../routes'

class ContributeForm extends Component {
    state = {
        value: '',
        error: '',
        loading: false
    }

    onSubmit = async event => {
        event.preventDefault()
        // Remove error & start loading
        this.setState({ error: '', loading: true })

        // Try contributing to campaign
        try {
            const campaign = Campaign(this.props.address)
            const accounts = await web3.eth.getAccounts()
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            })
            // Reload page
            Router.replaceRoute(`/campaigns/${this.props.address}`)
        } catch (err) {
            // Display error
            this.setState({ error: err.message })
        }

        // Stop loader & clear form
        this.setState({ value: '', loading: false })
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.error} >
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input
                        value={this.state.value}
                        onChange={event => this.setState({ value: event.target.value })}
                        label="ether"
                        labelPosition="right"
                    />
                </Form.Field>
                <Message error header="Oops!" content={this.state.error} />
                <Button primary loading={this.state.loading} disabled={this.state.loading} >
                    Contribute!
                </Button>
            </Form>
        )
    }

}

export default ContributeForm