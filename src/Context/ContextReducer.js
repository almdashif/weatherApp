export const initialState = {
    KeyUrl: '',
  };
  
  export function AllReducer(cstate, action) {
    switch (action.type) {
      case 'KeyUrl': {
        return { ...cstate, KeyUrl: action.payload };
      }
    
      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  }
  