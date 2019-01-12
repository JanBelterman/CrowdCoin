import React, { Component } from 'react'
import { Table, Button } from 'semantic-ui-react'
import web3 from '../ethereum/web3'
import Campaign from '../ethereum/campaign'
import { Router } from '../routes'

class RequestRow extends Component {
    state = {
        loadingApprove: false,
        loadingFinalize: false,
        error: ''
    }

    onApprove = async () => {
        // Start loader
        this.setState({ loadingApprove: true })

        // Try approving the request
        try {
            const campaign = Campaign(this.props.address)
            const accounts = await web3.eth.getAccounts()
            await campaign.methods.approveRequest(this.props.id).send({
                from: accounts[0]
            })
        } catch (err) {
            // Display error
            this.setState({ error: err.message })
        }

        // Stop loader
        this.setState({ loadingApprove: false })
        // Reload page
        Router.replaceRoute(`/campaigns/${this.props.address}/requests`)
    }

    onFinalize = async () => {
        // Start loader
        this.setState({ loadingFinalize: true })

        // Try finalizing the request
        try {
            const campaign = Campaign(this.props.address)
            const accounts = await web3.eth.getAccounts()
            await campaign.methods.finalizeRequest(this.props.id).send({
                from: accounts[0]
            })
        } catch (err) {
            // Display error
            this.setState({ error: err.message })
        }

        // Stop loader
        this.setState({ loadingFinalize: false })
        // Reload page
        Router.replaceRoute(`/campaigns/${this.props.address}/requests`)
    }

    render() {
        const { Row, Cell } = Table
        const { id, request, approversCount } = this.props
        const readyToFinalize = request.approvalCount > approversCount / 2

        return (
            <Row
                disabled={request.complete}
                positive={readyToFinalize && !request.complete}
            >
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.approvalCount}/{approversCount}</Cell>
                <Cell>
                    {request.complete ? null : (
                        <Button
                            color="green"
                            basic onClick={this.onApprove}
                            loading={this.state.loadingApprove}
                            disabled={this.state.loadingFinalize}
                        >
                            Approve
                        </Button>
                    )}
                </Cell>
                <Cell>
                    {request.complete ? null : (
                        <Button
                            color="teal"
                            basic onClick={this.onFinalize}
                            loading={this.state.loadingFinalize}
                            disabled={this.state.loadingFinalize}
                        >
                            Finalize
                        </Button>
                    )}
                </Cell>
            </Row>
        )
    }

}

export default RequestRow