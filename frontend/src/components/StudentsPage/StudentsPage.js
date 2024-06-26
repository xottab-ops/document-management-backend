import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageTemplate from '../PageTemplate/PageTemplate';
import TableTemplate from "../generic/TableTemplate";
import { headersStudents } from '../generic/consts';
import { studentFields } from "../generic/FormFields";
import OverlayForm from "../DynamicFormPage/OverlayForm";

const StudentsPage = ({ apiEndpoint, token }) => {
    const [students, setStudents] = useState([]);
    const [selected, setSelected] = useState(null);
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [isEdited, setIsEdited] = useState(false);
    const fields = studentFields;
    const headers = headersStudents;

    const fetchStudents = () => {
        axios.get(apiEndpoint, {
            headers: {
                'Authorization': `Bearer ${token}` // Используем токен из пропсов
            }
        })
            .then(response => {
                setStudents(response.data);
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных', error);
            });
    }

    useEffect(() => {
            fetchStudents()
        },
        [apiEndpoint, token]);

    const handleRowClick = (customer) => {
        setSelected(customer);
    };

    const handleNewStudentClick = () => {
        setIsEdited(false);
        setSelected(null)
        setOverlayVisible(true);
    };

    const handleChangeStudentClick = () => {
        if (selected) {
            setIsEdited(true);
            setOverlayVisible(true);
        }
        else {
            alert("Вы не выбрали ученика")
        }
    }

    const handleCloseOverlay = () => {
        setOverlayVisible(false);
        fetchStudents();
    };

    const footerButtons = [
        { label: 'Создать нового ученика', onClick: handleNewStudentClick },
        { label: 'Изменить данные ученика', onClick: handleChangeStudentClick }
    ];

    const formatCustomerData = (student, index) => ({
        'name': student.name,
        'phone_number': student.phone_number,
        "id": student.id
    });

    return (
        <PageTemplate
            footerButtons={footerButtons}
        >
            <TableTemplate
                headers={headers}
                data={students.map(formatCustomerData)}
                onRowClick={handleRowClick}
                selectedRow={selected}
            />
            <OverlayForm
                isVisible={isOverlayVisible}
                fields={fields}
                onClose={handleCloseOverlay}
                initialValues={selected ? selected : null}
                apiEndpoint={apiEndpoint}
                isEdited={isEdited}
                token={token}
            />
        </PageTemplate>
    );
};

export default StudentsPage;