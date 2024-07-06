type RandomNumberProps = {
    value: number;
  };
  
  type Positive = RandomNumberProps & {
    isPositive: boolean;
    isNegative?: never;
    isZero?: never;
  };
  
  type Negative = RandomNumberProps & {
    isNegative: boolean;
    isPositive?: never;
    isZero?: never;
  };
  
  type Zero = RandomNumberProps & {
    isZero: boolean;
    isPositive?: never;
    isNegative?: never;
  };
  
  type RandomNumberPropsUnion = Positive | Negative | Zero;
  
  const RandomNumber = ({
    value,
    isPositive,
    isNegative,
    isZero,
  }: RandomNumberPropsUnion) => {
    return (
      <div>
        {value}
        {isPositive && " Positive"}
        {isNegative && " Negative"}
        {isZero && " Zero"}
      </div>
    );
  };
  
  export default RandomNumber;
  