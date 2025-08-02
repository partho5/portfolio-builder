// utils/configValidator.ts
import {
    LandingPageConfig,
    ComponentConfig,
    ValidationResult,
    ValidationError,
    ComponentType,
    StyleName,
    Positioning,
    Size
} from '../types';
import { COMPONENT_TYPES, STYLE_NAMES, POSITIONING, SIZES } from './constants';

export const validateConfig = (config: LandingPageConfig): ValidationResult => {
    // TODO: Implement comprehensive config validation
    // TODO: Check required fields
    // TODO: Validate component types
    // TODO: Validate style names
    // TODO: Validate positioning values
    // TODO: Validate size values
    // TODO: Return validation errors

    const errors: ValidationError[] = [];

    if (!Array.isArray(config)) {
        errors.push({
            field: 'config',
            message: 'Config must be an array'
        });
        return { isValid: false, errors };
    }

    config.forEach((item: ComponentConfig, index: number) => {
        const componentErrors = validateComponentConfig(item, index);
        errors.push(...componentErrors);
    });

    return { isValid: errors.length === 0, errors };
};

export const validateComponentConfig = (
    componentConfig: ComponentConfig,
    index?: number
): ValidationError[] => {
    // TODO: Implement individual component validation
    const errors: ValidationError[] = [];

    if (!componentConfig.componentType) {
        errors.push({
            field: 'componentType',
            message: 'componentType is required',
            index
        });
    } else if (!Object.values(COMPONENT_TYPES).includes(componentConfig.componentType)) {
        errors.push({
            field: 'componentType',
            message: `Invalid component type: ${componentConfig.componentType}`,
            index
        });
    }

    if (!componentConfig.styleName) {
        errors.push({
            field: 'styleName',
            message: 'styleName is required',
            index
        });
    } else if (!Object.values(STYLE_NAMES).includes(componentConfig.styleName)) {
        errors.push({
            field: 'styleName',
            message: `Invalid style name: ${componentConfig.styleName}`,
            index
        });
    }

    if (componentConfig.size === undefined) {
        errors.push({
            field: 'size',
            message: 'size is required',
            index
        });
    } else if (!Object.values(SIZES).includes(componentConfig.size)) {
        errors.push({
            field: 'size',
            message: `Invalid size: ${componentConfig.size}`,
            index
        });
    }

    if (!componentConfig.positioning) {
        errors.push({
            field: 'positioning',
            message: 'positioning is required',
            index
        });
    } else if (!Object.values(POSITIONING).includes(componentConfig.positioning)) {
        errors.push({
            field: 'positioning',
            message: `Invalid positioning: ${componentConfig.positioning}`,
            index
        });
    }

    // TODO: Add content validation
    // TODO: Add animation validation
    // TODO: Add custom className validation

    return errors;
};
