import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Leaderboard() {
  const usersList = useSelector((state) => state.users);

  const [averageTime, setAverageTime] = useState(0);
  const [bestTime, setBestTime] = useState(Number.POSITIVE_INFINITY);

  useEffect(() => {
    let sum = 0;
    let count = 0;
    let currentBestTime = Number.POSITIVE_INFINITY;

    usersList.forEach((user) => {
      const time = parseFloat(user.time);
      if (!isNaN(time) && time > 0) {
        sum += time;
        count += 1;
        if (time < currentBestTime) {
          currentBestTime = time;
        }
      }
    });

    if (count > 0) {
      setAverageTime(sum / count);
      setBestTime(currentBestTime);
    } else {
      setAverageTime(0);
      setBestTime(Number.POSITIVE_INFINITY);
    }
  }, [usersList]);

  const sortedUsers = [...usersList]
    .filter((user) => user.time && !isNaN(parseFloat(user.time)))
    .sort((a, b) => parseFloat(a.time) - parseFloat(b.time))
    .slice(0, 3);

  return (
    <div className="flex-1 flex flex-col font-playfair items-start bg-white rounded-xl shadow-lg p-8">
      <div className="flex flex-col gap-4 w-full">
        <div className="text-3xl underline font-bold">Leaderboard</div>
        <div className="flex flex-col gap-2">
          {sortedUsers.length > 0 ? (
            sortedUsers.map((user, index) => (
              <div
                key={user.id}
                className="flex items-center gap-4 rounded-md bg-muted p-3"
              >
                <div className="text-3xl font-bold">{index + 1}</div>
                <div className="flex-1">
                  <div className="font-bold text-2xl">{user.name}</div>
                  <div className="text-lg text-muted-foreground">
                    Time: {user.time}s
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No users available</p>
          )}
        </div>
      </div>
      <div className="flex font-playfair flex-col items-end gap-4 w-full text-right">
        <div className="text-3xl underline font-bold">Performance</div>
        <div className="text-2xl font-bold">
          {bestTime === Number.POSITIVE_INFINITY ? "N/A" : `${bestTime.toFixed(2)}s`}
        </div>
        <div className="text-2xl text-muted-foreground">Best Time</div>
        <div className="text-2xl font-bold">{averageTime.toFixed(2)}s</div>
        <div className="text-2xl text-muted-foreground">Average Time</div>
      </div>
    </div>
  );
}
