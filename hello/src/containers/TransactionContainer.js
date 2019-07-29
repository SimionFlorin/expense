import { addTransaction } from "../actions";
import { connect } from 'react-redux';
import CategoryType from './../components/CategoryType';


const mapStateToProps = (state) => ({
    transactions:state.transactions
})

const mapDispatchToProps = dispatch => ({
    addTransactionToStore:(transaction)=>dispatch(addTransaction(transaction))
})

export default connect(mapStateToProps,mapDispatchToProps)(CategoryType)
