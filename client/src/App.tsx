import {Button, Card, Form, InputGroup, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {

    useEffect(() => {
        axios.get('http://localhost:5000/api/contact/')
            .then(response => setContacts(response.data.rows));
    }, []);

    let [contacts, setContacts] = useState<{ name: string, tel: string }[]>([])
    let [searchedContacts, setSearchedContacts] = useState<{ name: string, tel: string }[]>([])


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState<string>("")
    const [tel, setTel] = useState<string>("")
    const [search, setSearch] = useState<string>("")

    const [newName, setNewName] = useState<string>("")
    const [newTel, setNewTel] = useState<string>("")

    const [oldEditName, setEditOldName] = useState<string>("")

     function addContact() {

         axios.post('http://localhost:5000/api/contact/',{name: name, tel: tel})

        const newContacts = [...contacts, {name: name, tel: tel}]

        setContacts(newContacts)

        setName("")
        setTel("")

    }

    function deleteContact(name: string) {
        setContacts(contacts.filter((i) => i.name != name))

        axios.delete('http://localhost:5000/api/contact/', {data: {name: name}})
    }

    function searchContacts(searchValue: string) {
        setSearch(searchValue)

        setSearchedContacts(contacts.filter((i) => i.name.includes(searchValue)))
    }

    function saveChanges() {
        handleClose()

        axios.delete('http://localhost:5000/api/contact/', {data: {name: oldEditName}})
        axios.post('http://localhost:5000/api/contact/', {name: newName, tel: newTel})

        const newContacts = [...contacts.filter((i) => i.name != oldEditName), {name: newName, tel: newTel}]
        setContacts(newContacts)

        setNewName("")
        setNewTel("")

        handleClose()
    }

    function handleEditClick(cName: string) {
        handleShow()

        setEditOldName(cName)
    }

    return (
        <div>
            <h1 className="text-3xl text-center mt-3">
                Телефонный справочник
            </h1>
            <Form className={"m-3"}>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label>Имя</Form.Label>
                    <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Имя"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Номер телефона</Form.Label>
                    <Form.Control value={tel} onChange={(e) => setTel(e.target.value)} type="text"
                                  placeholder="Номер телефона"/>
                </Form.Group>
                <Button onClick={() => addContact()} variant="primary">
                    Создать контакт
                </Button>
            </Form>
            <div className={"m-3"}>
                <h3 className="text-3xl text-center mt-3 mb-3">Контакты</h3>
                <InputGroup className="mb-3">
                    <Button variant="outline-secondary" id="button-addon1">
                        Поиск
                    </Button>
                    <Form.Control
                        value={search}
                        onChange={(e) => searchContacts(e.target.value)}
                        placeholder={"Введите имя контакта"}
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                {search === "" ? contacts.map((contactItem) => {
                        return <Card key={contactItem.name} className={"mb-3"}>
                            <Card.Body className={"flex items-center"}>
                                <Card.Text>
                                    Имя: {contactItem.name} Teлефон: {contactItem.tel}
                                </Card.Text>
                                <Button className={"ml-3"} variant="outline-warning" onClick={() => handleEditClick(contactItem.name)}>
                                    Редактировать
                                </Button>
                                <Button onClick={() => deleteContact(contactItem.name)} className={"ml-3"}
                                        variant="outline-danger">Удалить
                                </Button>
                            </Card.Body>
                        </Card>
                    })
                    :
                    searchedContacts.map((contactItem) => {
                        return <Card key={contactItem.name} className={"mb-3"}>
                            <Card.Body className={"flex items-center"}>
                                <Card.Text>
                                    Имя: {contactItem.name} Teлефон: {contactItem.tel}
                                </Card.Text>
                                <Button className={"ml-3"} variant="outline-warning" onClick={() => handleEditClick(contactItem.name)}>
                                    Редактировать
                                </Button>
                                <Button onClick={() => deleteContact(contactItem.name)} className={"ml-3"}
                                        variant="outline-danger">Удалить
                                </Button>
                            </Card.Body>
                        </Card>
                    })
                }
            </div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title className={"text-dark"}>Редактирование</Modal.Title>
                </Modal.Header>
                <Form  className={"m-3"} >
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control
                            type="text"
                            placeholder="Новое имя"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control
                            type="text"
                            value={newTel}
                            onChange={(e) => setNewTel(e.target.value)}
                            placeholder="Новый номер телефона"
                            autoFocus
                        />
                    </Form.Group>
                </Form>
                <Modal.Footer className={"justify-center"}>
                    <Button variant="outline-success" onClick={() => saveChanges()}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default App
