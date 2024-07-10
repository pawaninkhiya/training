export enum SelectedPage {
  Home = "home",
  Benifits = "benifits",
  OurClasses = "ourclasses",
  ContactUs = "contactus"

}

export type BenefitType = {
  icon: JSX.Element;
  title: string,
  description: string
}

export type ClassType = {
  name: string,
  description?: string,
  image: string
}