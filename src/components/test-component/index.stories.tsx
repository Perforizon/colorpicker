import React from "react";
import TestComponent from './index';

export default {
  title: "TestComponent"
};

export const Primary = () => <TestComponent theme="primary" />;

export const Secondary = () => <TestComponent theme="secondary" />;
