import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types/Index'

const tasksReducer = (state, action) => {
    switch(action.type){
        case TAREAS_PROYECTO: 
            return {
                ...state, 
                projectTask: action.payload
            }
        case AGREGAR_TAREA: 
        console.log(action.payload)
            return {
                ...state,
                projectTask: [...state.projectTask, action.payload],
                errorTask: false
            }
        case VALIDAR_TAREA: 
            return{
                ...state,
                errorTask: true
            }
        case ELIMINAR_TAREA: 
            return {
                ...state, 
                projectTask: state.projectTask.filter(task => task._id !== action.payload)
            }
        case ACTUALIZAR_TAREA:
            return { 
                ...state,
                projectTask: state.projectTask.map(task => task._id === action.payload._id ? action.payload : task)

            }
        case TAREA_ACTUAL: 
            return {
                ...state,
                selectedTask: action.payload
            }
        case LIMPIAR_TAREA: 
            return {
                ...state,
                selectedTask: null,
                errorTask: false
            }
        default: 
            return state; 
    }


}
export default tasksReducer