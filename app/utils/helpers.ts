import { Workstream } from "../.graphclient";
import { BigNumberish } from "ethers";
import _, { groupBy, mapValues, meanBy } from "lodash";

export type Ratings = {
  [address: string]: number;
};

export const parseEvaluations = (workstream?: Workstream) => {
  const currentEvaluations = groupBy(workstream?.evaluations, "contributor.id");

  return mapValues(currentEvaluations, (evaluation) =>
    meanBy(evaluation, (e) => Number(e.rating))
  ) as Ratings;
};

const roundToTarget = (ratings: Ratings, target: number) => {
  let l = Object.values(ratings) as number[];
  let off = target - _.reduce(l, (acc, x) => acc + Math.round(x), 0);
  let flat = Object.entries(ratings);

  let rounded = _.chain(flat)
    .sortBy((flat) => Math.round(Number(flat[1])) - Number(flat[1]))
    .map((x, i) => {
      let newX = x;
      newX[1] =
        Math.round(Number(x[1])) +
        (off > i ? 1 : 0) -
        (i >= l.length + off ? 1 : 0);
      return newX;
    })
    .value();

  return Object.fromEntries(rounded) as Ratings;
};

export const calculateRelative = (data: Ratings) => {
  const total = _.sum(Object.values(data));

  const relative = mapValues(
    data,
    (value) => _.divide(Number(value), Number(total)) * 100
  );

  return roundToTarget(relative, 100);
};

export const decodeURI = (data: string) => {

  let decodedString: string;

  const base64String = data.split(",")[1];
  const buffer = Buffer.from(base64String, 'base64');

  decodedString = buffer.toString();
  
  const json = JSON.parse(decodedString);
  const splitLink = json.image.substring(6)

  return splitLink;
}

export const shortenString = (str: string, maxLength: number) => {

  const ellipsis = "...";
  const ellipsisLength = ellipsis.length;

  const midpoint = Math.floor(maxLength / 2);

  const firstHalf = str.slice(0, midpoint);
  const secondHalf = str.slice(str.length - midpoint + ellipsisLength);

  return firstHalf + ellipsis + secondHalf;
}