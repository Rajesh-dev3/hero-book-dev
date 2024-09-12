
import "./styles.scss"
const RunPosition = ({ data }) => {
  return (
    <div>
      <div className="title">
        <h1>Run Position</h1>
      </div>
      <div className="run-content">
        <table>

          <tbody >
            <tr >
              <td >Run</td>
              <td >Value</td>
            </tr>
            {data?.map((item) => {
              return (

                <tr className="bg-light" key={item?.key}>
                  <td >{item?.key}</td>
                  <td className={item?.value>0?"green-color":"red-color"}>{item?.value}</td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RunPosition