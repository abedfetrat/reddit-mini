export function getTimeAgo(dateInSeconds) {
    const differenceInSeconds = Math.round(((Date.now() / 1000) - dateInSeconds));

    let timeInterval = Math.round(differenceInSeconds / 31536000);
    if (timeInterval >= 1) {
        return `${timeInterval} years ago`;
    }

    timeInterval = Math.round(differenceInSeconds / 2592000);
    if (timeInterval >= 1) {
        return `${timeInterval} months ago`;
    }

    timeInterval = Math.round(differenceInSeconds / 604800);
    if (timeInterval >= 1) {
        return `${timeInterval} weeks ago`;
    }

    timeInterval = Math.round(differenceInSeconds / 86400);
    if (timeInterval >= 1) {
        return `${timeInterval} days ago`;
    }

    timeInterval = Math.round(differenceInSeconds / 3600);
    if (timeInterval >= 1) {
        return `${timeInterval} hours ago`;
    }

    timeInterval = Math.round(differenceInSeconds / 60);
    if (timeInterval >= 1) {
        return `${timeInterval} minutes ago`;
    }

    return `${differenceInSeconds} seconds ago`;
}

export function getCompactNumber(number) {
    return number >= 1000 ? `${(number / 1000).toFixed(1)}k` : number;
}