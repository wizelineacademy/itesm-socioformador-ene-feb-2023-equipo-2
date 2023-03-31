// TODO
// Poner una imagen de placeholden en caso de que no haya foto de perfil
// Arreglar para la vista tipo telefono

import React from 'react';
import * as FaIcons from 'react-icons/fa';
import styles from './EmployeeCard.module.css';

const handleEmployeeDelete = () => {
  alert("se va a eliminar el usuario del sistema");
};

const handleEmployeeSeeInfo = () => {
  alert("se va a redireccionar al perfil del usuario");
};

const handleEmployeeEraseFromProject = () => {
  alert("se va a eliminar el usuario de la lista de la orden");
};

const handleEmployeeAddToProject = () => {
  alert("se van a agregar el usuario a la lista de la orden");
};

const EmployeeCard = () => {
  return (
    <>
      <div className='container my-4'>
        <div className={styles['employee-info-card']}>
          <div className='row'>
            <div className="col-md-5 d-flex justify-content-start">
              <div className={styles['erase-later-circle']}></div>
              <div className="d-flex align-items-start flex-column">
                <label className="h2 mt-3">
                  Mario Isaí Robles Lozano
                </label>
                <label className="h5">
                  Ocupacion
                </label>
                <label>
                  Algo mas
                </label>
              </div>
            </div> 
            <div className="col-md-3">
            </div>
            <div className="col-md-4 d-flex align-items-center justify-content-end">
              <div className="d-flex justify-content-end">
                <button className="btn" onClick={handleEmployeeDelete}>
                  <FaIcons.FaTrashAlt className="mx-2" size={25} />
                </button>
                <button className="btn" onClick={handleEmployeeSeeInfo}>
                  <FaIcons.FaListUl className="mx-2" size={25} />
                </button>
                <button className="btn" onClick={handleEmployeeEraseFromProject}>
                  <FaIcons.FaMinus className="mx-2" size={25} />
                </button>
                <button className="btn" onClick={handleEmployeeAddToProject}>
                  <FaIcons.FaPlus className="mx-2" size={25} />
                </button>
              </div>
            </div>  
          </div>
        </div>
      </div>
    </>
  )
}

export default EmployeeCard