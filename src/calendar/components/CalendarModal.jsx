import { useState, useMemo, useEffect } from 'react';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import Swal from 'sweetalert2';

import es from 'date-fns/locale/es';
import addHours from 'date-fns/addHours';

import 'react-datepicker/dist/react-datepicker.css';
import 'sweetalert2/dist/sweetalert2.min.css';

import { useSelectorStore } from '../../hooks';

registerLocale('es', es);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

const initialFormEvent = {
  title: '',
  notes: '',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Nacho'
  }
};

export const CalendarModal = () => {
  const {
    ui: { isDateModalOpen },
    calendar: { activeEvent },
    onCloseDateModal,
    setActiveEvent,
    addNewEvent,
    updateEvent,
    deleteEvent
  } = useSelectorStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formValues, setFormValues] = useState(initialFormEvent);

  const isValid = useMemo(() => {
    if (!formSubmitted) return '';
    return formValues?.title.trim() ? 'is-valid' : 'is-invalid';
  }, [formValues?.title, formSubmitted]);

  const handleChangeFormValues = ({ target: { name, value } }) => setFormValues(v => ({ ...v, [name]: value }));

  const handleDateChange = (date, value) => setFormValues(v => ({ ...v, [date]: value }));

  const onCloseModal = () => {
    onCloseDateModal();

    setTimeout(() => {
      setFormValues(initialFormEvent);
      setFormSubmitted(false);
      setActiveEvent(null);
    }, 200);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds(formValues?.end, formValues?.start);

    if (isNaN(difference) || difference <= 0) {
      return Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
    }
    if (!formValues.title.trim()) return;

    if (activeEvent?._id) {
      updateEvent(formValues);
    } else {
      addNewEvent({ ...formValues, _id: crypto.randomUUID() });
    }
    onCloseModal();
  };

  useEffect(() => {
    if (!!activeEvent) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  return (
    <Modal
      className="modal"
      closeTimeoutMS={200}
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      overlayClassName="modal-fondo"
      style={customStyles}
    >
      <div className="container">
        <h1>{activeEvent?._id ? 'Actualizar evento' : 'Nuevo Evento'}</h1>
        <hr />

        <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
          <div>
            <label>Fecha y hora inicio</label>
            <DatePicker
              dateFormat="Pp"
              locale="es"
              selected={formValues?.start}
              onChange={e => handleDateChange('start', e)}
              showTimeSelect
              timeCaption="Hora"
              className="form-control"
            />
          </div>

          <div>
            <label>Fecha y hora fin</label>
            <DatePicker
              dateFormat="Pp"
              locale="es"
              minDate={formValues?.start}
              selected={formValues?.end}
              onChange={e => handleDateChange('end', e)}
              showTimeSelect
              timeCaption="Hora"
              className="form-control"
            />
          </div>

          <hr className="m-0 mt-2" />

          <div>
            <label>Titulo y notas</label>
            <input
              type="text"
              className={`form-control ${isValid}`}
              placeholder="Título del evento"
              name="title"
              value={formValues?.title}
              onChange={handleChangeFormValues}
              autoComplete="off"
            />
            <small id="emailHelp" className="form-text text-muted">
              Una descripción corta
            </small>
          </div>

          <div>
            <textarea
              type="text"
              className="form-control"
              placeholder="Notas"
              rows="5"
              name="notes"
              value={formValues?.notes}
              onChange={handleChangeFormValues}
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">
              Información adicional
            </small>
          </div>

          <div className="d-flex gap-2 ">
            <button type="submit" className="btn btn-outline-primary w-100">
              <i className="fa fa-save"></i>
              <span> Guardar</span>
            </button>

            {!!activeEvent && (
              <button
                type="button"
                className="btn btn-outline-danger w-100"
                onClick={() => {
                  deleteEvent(activeEvent?._id);
                  onCloseModal();
                }}
              >
                <i className="fa fa-trash"></i>
                <span> Borrar</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};
