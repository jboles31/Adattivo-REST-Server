import React from 'react';

const EmpID = (props) => (
  <div>
    Search By ID
    <form onSubmit={() => props.search()}>
      <input type="text" name='input' onChange={(e) => props.updateInput(e)}></input>
      <button type='submit' onSubmit={() => props.search()}>Submit</button>
    </form>
  </div>
)

export default EmpID;