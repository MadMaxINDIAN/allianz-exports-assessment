import { useState } from 'react';
import './App.css';

const operands_list = [
    {
        name: "A",
        value: 5
    }, {
        name: "B",
        value: 10
    }, {
        name: "C",
        value: 8
    }, {
        name: "D",
        value: 9
    }, {
        name: "E",
        value: 12
    }
]
const operators_list = [
    {
        name: "+",
    }, {
        name: "-",
    }, {
        name: "*",
    }, {
        name: "/",
    }
]

function App() {
    const [canvasList, setCanvasList] = useState([]);
    const [onMove, setOnMove] = useState();

    const onDragStartHandler = (e) => {
        console.log("Drag start")
        setOnMove(e.target);
    }

    const onDragEndHandler = () => {
        console.log("Drag end");
        setOnMove(null);
    }

    const onDragOverHandler = (e) => {
        e.preventDefault();
        console.log("Drag over");
    }

    const onDragEnterHandler = () => {
        console.log("Drag enter");
    }

    const onDragLeaveHandler = () => {
        console.log("Drag leave");
    }

    const onDropHandler = (e) => {
        console.log("Drop");
        console.log(onMove)
        const node = onMove.cloneNode(true);
        node.className += " close";
        node.draggable = false;
        node.onclick = closeHandler;
        e.target.append(node);
    }

    const comparatorHandler = (e) => {
        const canvas = document.getElementsByClassName('canvas')[0];
        const node = e.target.cloneNode(true);
        node.className += " close";
        node.onclick = closeHandler;
        canvas.append(node);
    }

    const rhsHandler = (e) => {
        const canvas = document.getElementsByClassName('canvas')[0];
        var number = window.prompt("Enter number");
        if (parseInt(number)) {
            const node = document.createElement('div');
            node.className = "rhs";
            node.onclick = comparatorHandler;
            node.innerHTML = number;
        node.onclick = closeHandler;
        canvas.append(node);
        } else {
            alert('Not Integer')
        }
    }

    const closeHandler = (e) => {
        console.log("Close Handler")
        e.target.remove();
    }

    const evaluate = () => {
        try {
            var s = "";
            var found = false;
            const eq = document.getElementsByClassName('canvas')[0].textContent;
            for (var i = 0; i < eq.length; i++) {
                found = false;
                for (var j = 0; j < operands_list.length; j++) {
                    if (operands_list[j].name === eq[i]) {
                        s += operands_list[j].value;
                        found = true;
                    }
                }
                if (found) continue;
                s += eq[i];
            }
            alert(eval(s), s);
        } catch (err) {
            alert("Eqaution invalid");
            console.log(err);
        }
    }

    return (
        <div className="App">
            <p className='app-title' >Allianz exports calulator assessment - "Naman Khater</p>
            <p style={{ fontWeight: "600" }}>To remove a element from drop area click on the element in the press area</p>
            <hr />
            <div className="operands">
                {operands_list.map((operands_list_item, index) =>
                    <div key={index} className="operand" onDragEnd={onDragEndHandler} onDragStart={onDragStartHandler} draggable="true" data-value={operands_list_item.value}>
                        {operands_list_item.name}
                    </div>
                )}
            </div>
            <hr />
            <div className="operators">
                {operators_list.map((operands_list_item, index) =>
                    <div key={index} className="operator" onDragEnd={onDragEndHandler} onDragStart={onDragStartHandler} draggable="true" data-value={operands_list_item.name}>
                        {operands_list_item.name}
                    </div>
                )}
                <span className="space"></span>
                <div className="comparator" onClick={comparatorHandler} data-value="<">&lt;</div>
                <div className="comparator" onClick={comparatorHandler} data-value=">">&gt;</div>
                <span className="space"></span>
                <div className="rhs" onClick={rhsHandler}>RHS Integer</div>
            </div>
            <hr />
            <div className='canvas' onDragOver={onDragOverHandler} onDragLeave={onDragLeaveHandler} onDragEnter={onDragEnterHandler} onDrop={onDropHandler}></div>
            <button className="submit" onClick={evaluate}>Evaluate</button>
        </div>
    );
}

export default App;
