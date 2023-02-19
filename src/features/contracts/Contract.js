import './contracts.css'
import { NumericFormat } from 'react-number-format';
import { Row, Col, Card } from 'react-bootstrap';


const Contract = ({ contract }) => {

    let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(contract.updated_timestmp);
    let rooms = contract.rooms.map((room) => { return <button key={room.id} size='sm' className='rooms' disabled>{room.name}</button> });

    const getTotalByNumericFormat = () => {
        return <NumericFormat
            className='total'
            value={contract.totalProject}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'} />
    }

    const getStage = () => {
        if (contract.projectState === "In progress") return <button size='sm' className='stage-in-progress'>{contract.projectState}</button>
        else if (contract.projectState === "Cancelled") return <button size='sm' className='stage-cancelled'>{contract.projectState}</button>
        else if (contract.projectState === "Done") return <button size='sm' className='stage-done'>{contract.projectState}</button>
        else if (contract.projectState === "Negotiation") return <button size='sm' className='stage-negotiation'>{contract.projectState}</button>
    }

    const getTilesForContracts = () => {
        return (
            <div className='tile'>
                <Card.Header className='customerName'>{contract.customerName ? contract.customerName : "Untitiled"}
                    <Card.Subtitle className='projectId'>ID: {contract.projectId}</Card.Subtitle>
                </Card.Header>
                <Card.Body>
                    <Card.Text className='address'>{contract.address}</Card.Text>
                    <div>
                        <Row>
                            <Col>
                                {rooms}
                            </Col>
                        </Row>
                    </div>
                    <div className='list-bottom'>
                        <div className='list-bottom-section'>
                            <span>Last updated</span>
                            <span className='date'>{date}</span>
                        </div>
                        <div className='list-bottom-section'>
                            <span>Total</span>
                            <span >{getTotalByNumericFormat()}</span>
                        </div>
                        <div className='list-bottom-section'>
                            <span>Stage</span>
                            <span>{getStage()}</span>
                        </div>
                    </div>
                </Card.Body>
            </div>
        )
    }

    return (
        <div className='allTilesOfContracts'>
            {getTilesForContracts()}
        </div>
    )
}

export default Contract