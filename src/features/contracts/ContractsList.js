import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchContracts, fetchContracts, getContractsError, getContractsStatus } from './contractSlice';
import Contract from './Contract';
import './contracts.css';


const ContractsList = () => {
    const dispatch = useDispatch();

    const searchContracts = useSelector(selectSearchContracts);
    const contractsStatus = useSelector(getContractsStatus);
    const error = useSelector(getContractsError);

    useEffect(() => {
        if (contractsStatus === 'idle') {
          dispatch(fetchContracts())
        }
      }, [contractsStatus, dispatch])

      let content;
      if (contractsStatus === 'loading') {
        content = <p>"loading..."</p>;
      } else if (contractsStatus === 'succeeded') {
        const contractsInOrderOfLastUpdate = searchContracts.slice().sort((a, b) => (b.updated_timestmp) - (a.updated_timestmp))
        content = contractsInOrderOfLastUpdate.map(contract => <Contract key={contract.id} contract={contract}/>)
      } else if (contractsStatus === 'failed') {
        content = <p>{error}</p>
      }
      return (    
        <div className='grid'>
          {content}
        </div>   
      )

  
}

export default ContractsList