const displayTime = (timeInSeconds, displayHours = false) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    if (displayHours) {
        return (
            String(hours).padStart(2, '0') +
            ':' +
            String(minutes % 60).padStart(2, '0') +
            ':' +
            String(seconds).padStart(2, '0')
        );
    }

    return (
        String(minutes).padStart(2, '0') +
        ':' +
        String(seconds).padStart(2, '0')
    );
};

export default displayTime;
