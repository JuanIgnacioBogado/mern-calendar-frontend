import { useState, useMemo, useEffect } from 'react';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import Swal from 'sweetalert2';
import es from 'date-fns/locale/es';
import addHours from 'date-fns/addHours';

import 'react-datepicker/dist/react-datepicker.css';
import 'sweetalert2/dist/sweetalert2.min.css';

import { useCalendarStore } from '../../hooks';

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
    activeEvent,
    isDateModalOpen,
    isLoading,
    onCloseDateModal,
    setActiveEvent,
    startDeleteEvent,
    startNewEvent,
    startUpdateEvent
  } = useCalendarStore();

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

  const handleSubmit = async e => {
    e.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds(formValues?.end, formValues?.start);

    if (isNaN(difference) || difference <= 0) {
      return Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
    }
    if (!formValues.title.trim()) return;

    if (activeEvent?.id) {
      await startUpdateEvent(formValues);
    } else {
      await startNewEvent(formValues);
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
      appElement={document.getElementById('root')}
      ariaHideApp={import.meta.env.NODE_ENV !== 'test'}
      className="modal"
      closeTimeoutMS={200}
      isOpen={isDateModalOpen}
      overlayClassName="modal-fondo"
      style={customStyles}
      onRequestClose={onCloseModal}
    >
      <div className="container">
        <h1>{activeEvent?.id ? 'Actualizar evento' : 'Nuevo Evento'}</h1>
        <hr />

        <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
          <div>
            <label>Fecha y hora inicio</label>
            <DatePicker
              showTimeSelect
              className="form-control"
              dateFormat="Pp"
              locale="es"
              selected={formValues?.start}
              timeCaption="Hora"
              onChange={e => handleDateChange('start', e)}
            />
          </div>

          <div>
            <label>Fecha y hora fin</label>
            <DatePicker
              showTimeSelect
              className="form-control"
              dateFormat="Pp"
              locale="es"
              minDate={formValues?.start}
              selected={formValues?.end}
              timeCaption="Hora"
              onChange={e => handleDateChange('end', e)}
            />
          </div>

          <hr className="m-0 mt-2" />

          <div>
            <label>Titulo y notas</label>
            <input
              autoComplete="off"
              className={`form-control ${isValid}`}
              name="title"
              placeholder="Título del evento"
              type="text"
              value={formValues?.title}
              onChange={handleChangeFormValues}
            />
            <small className="form-text text-muted" id="emailHelp">
              Una descripción corta
            </small>
          </div>

          <div>
            <textarea
              className="form-control"
              name="notes"
              placeholder="Notas"
              rows="5"
              type="text"
              value={formValues?.notes}
              onChange={handleChangeFormValues}
            />
            <small className="form-text text-muted" id="emailHelp">
              Información adicional
            </small>
          </div>

          <div className="d-flex gap-2 ">
            <button className="btn btn-outline-primary w-100" disabled={isLoading} type="submit">
              <i className="fa fa-save" />
              <span> Guardar</span>
            </button>

            {!!activeEvent && (
              <button
                className="btn btn-outline-danger w-100"
                disabled={isLoading}
                type="button"
                onClick={() => {
                  startDeleteEvent(activeEvent?.id);
                  onCloseModal();
                }}
              >
                <i className="fa fa-trash" />
                <span> Borrar</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};
