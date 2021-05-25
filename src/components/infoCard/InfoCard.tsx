import { Accordion } from 'semantic-ui-react';

export type InfoCardProps = {
  title: string;
  value: number;
};

const InfoCard = (props: InfoCardProps) => {
  if (!props.value) {
    return null;
  }

  /**
   * convert statistics into UI compatible numbers
   * @param number sent from api
   * @returns string to show
   */
  const toDecimal = (number: number): string => {
    return Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
      number
    );
  };

  return (
    <div className="info-accordion">
      <Accordion styled>
        <h5>{props.title}</h5>
        <p className="title">Total</p> <p>{toDecimal(props.value)}</p>
      </Accordion>
    </div>
  );
};

export default InfoCard;
