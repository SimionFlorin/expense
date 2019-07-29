import React from 'react'

import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Divider, ExpansionPanelActions } from "@material-ui/core";
import TransactionDialog from './TransactionDialog';
import { fetch } from './CategoriesList';



export default class CategoryType extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            isLoaded:false,
            isTransactionDialogOpen:false
        }  
    this.handleShowTransactions=this.handleShowTransactions.bind(this)
    this.closeTransactionDialog=this.closeTransactionDialog.bind(this)
    }

    async componentDidMount(){
        console.log(this.props)
        //get transactions
       
    }

    closeTransactionDialog() {
        this.setState({isTransactionDialogOpen:false})
    }

    async handleShowTransactions(){
        if(!this.state.isLoaded)
        await fetch({
            query: `{
                getTransactionsByTypeId(typeId:${this.props.typeId}){
                    transactionId,
                    transactionDate,
                    sum,
                    remarks,
                    typeId
                }
            }`
        }).then((response)=>{
            console.log(response.data)
            response.data.getTransactionsByTypeId&&response.data.getTransactionsByTypeId.map((transaction)=>{
                this.props.addTransactionToStore(transaction)

            })
        })
        this.setState({isLoaded:true})
    }
    render() {

        return(
            <div style={{width:'48vw',display:'flex'}}>
            <ExpansionPanel style={{width:'70%'}}>
                <ExpansionPanelSummary onClick={this.handleShowTransactions}>
                    <h3>{this.props.name}</h3>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{display:'block'}}>
                <span>Description: {this.props.description}</span> <Divider/>
                        {/* {JSON.stringify(this.props.transactions)} */}
                        {this.props.transactions.filter(transaction=>transaction.typeId===this.props.typeId).map((transaction)=>(
                            <div>
                                
                                Sum: {transaction.sum}<br/>
                                Remarks: {transaction.remarks}<br/>
                                transactionDate: {new Date(transaction.transactionDate).toDateString()}
                                <Divider/>
                            </div>
                        ))}
                </ExpansionPanelDetails>
                <ExpansionPanelActions>
                            <button onClick={()=>{this.setState({isTransactionDialogOpen:true})}}>Add a Transaction</button>
                </ExpansionPanelActions>
            </ExpansionPanel>
            <div style={{width:'30%'}}>
                <button onClick={()=>{}}>Delete this Type</button>
                <button onClick={()=>{}}>Edit this Type</button>
            </div>
             <TransactionDialog closeTransactionDialog={this.closeTransactionDialog} typeId={this.props.typeId}
            isTransactionDialogOpen={this.state.isTransactionDialogOpen} addTransactionToStore={this.props.addTransactionToStore}/> 
            </div>
        )
    }
}