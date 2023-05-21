import './styles/App.css';
import './styles/output.css'
import {useState} from "react";


function App() {
    const [week, setWeek] = useState(0)
    let dayAfterMonth = 0

    const days = ["po", "út", "st", "čt", "pá", "so", "ne"]

    function getMonday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day === 0 ? -6 : 1) + (week * 7); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }

    function CalendarCell() {
        return (
            <>
                <div className={"w-full h-14 border p-1"}>
                    <div className={"border-b flex items-center"}>Info</div>
                    <div className={"border-t flex items-center"}>Date</div>
                </div>
            </>
        )
    }


    function CalendarDay({dayId}) {
        let monday = getMonday(new Date())
        let lastDate = new Date(monday.getFullYear(), monday.getMonth() + 1, 0).getDate()

        if (monday.getDate() + dayId > lastDate) {
            dayAfterMonth++
        }

        return (
            <>
                <div
                    className={"flex flex-col gap-1 " + ((monday.getDate() + dayId > lastDate ? dayAfterMonth : monday.getDate() + dayId) === new Date().getDate() && (monday.getDate() + dayId > lastDate ? monday.getMonth() + 2 : monday.getMonth() + 1) === new Date().getMonth() + 1 && "bg-yellow-300/20")}>

                    <div className={"w-full"}>
                        <div className={"w-full border flex justify-center"}>
                            {monday.getDate() + dayId > lastDate ? days[monday.getDay() - 1 + dayId] + " " + (dayAfterMonth) + ". " + (monday.getMonth() + 2) + "." : days[monday.getDay() - 1 + dayId] + " " + (monday.getDate() + dayId) + ". " + (monday.getMonth() + 1) + "."}
                        </div>
                        <div className={"w-full h-14 border"}></div>
                    </div>

                    <div className={"flex"}>
                        {[...Array(1).keys()].map(
                            () => {
                                return (
                                    <>
                                        <CalendarCell/>
                                    </>

                                )
                            }
                        )}
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className={"bg-white w-screen h-screen flex justify-center items-center flex-col gap-2"}>
            <div>
                <div>

                </div>
                <div className={"uppercase flex gap-4"}>
                    <div className={"py-1 px-6 bg-blue-700 text-white rounded flex-1 select-none cursor-pointer"}
                         onClick={() => {
                             setWeek(week - 1)
                         }}>
                        &lt;
                    </div>
                    <div className={"py-1 px-6 bg-blue-700 text-white rounded flex-1 select-none cursor-pointer"}
                         onClick={() => {
                             setWeek(0)
                         }}>
                        Teď
                    </div>
                    <div className={"py-1 px-6 bg-blue-700 text-white rounded flex-1 select-none cursor-pointer"}
                         onClick={() => {
                             setWeek(week + 1)
                         }}>
                        &gt;
                    </div>
                </div>
            </div>

            <div className={"grid grid-cols-7 w-4/5"}>
                {[...Array(7).keys()].map(
                    (key) => {
                        return (
                            <>
                                <CalendarDay dayId={key}/>
                            </>

                        )
                    }
                )}
            </div>
        </div>
    );
}

export default App;
