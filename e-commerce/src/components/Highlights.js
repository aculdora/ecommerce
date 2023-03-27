import { Row, Col, Card } from 'react-bootstrap';
import Pita from "../Photos/pita.jpg";
import ShawarmaRice from "../Photos/shawarmarice.jpg";
import './Banner.css';



// export a function
export default function Highlights() {
    return (
    	<Row className="mt-3 mb-3">
        <h1 className="text-center"></h1>
            <Col xs={12} md={6}>
                <Card className="cardHighlight p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <Card.Body>
                        <Card.Title>
                            <h2 className="text-center text-light">Shawarma - PITA</h2>
                        </Card.Title>
                        <Card.Text>
                            <div className="container-fluid text-center"><img className="img-fluid"  src={Pita} alt="Pita" /*style={{ maxWidth: '500px' }}*/ /></div>

                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} md={6}>
                <Card className="cardHighlight p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <Card.Body>
                        <Card.Title>
                            <h2 className="text-center text-light">Shawarma Rice</h2>
                        </Card.Title>
                        <Card.Text>
                            <div className="container-fluid text-center"><img className="img-fluid"  src={ShawarmaRice} alt="Shawarma Rice" /*style={{ maxWidth: '500px' }}*/ /></div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}
