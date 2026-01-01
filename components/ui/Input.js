import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function Input({
  label,
  error,
  icon,
  isPassword = false,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  autoCapitalize,
  style,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={[
        styles.inputContainer,
        isFocused && styles.focusedBorder,
        error && styles.errorBorder
      ]}>
        {icon && (
          <Ionicons 
            name={icon} 
            size={20} 
            color={error ? Colors.error : (isFocused ? Colors.primary : Colors.text)} 
            style={styles.icon}
          />
        )}
        
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor="#999"
          {...props}
        />

        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Ionicons 
              name={showPassword ? "eye-off" : "eye"} 
              size={20} 
              color={Colors.gray} 
            />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 16,
    paddingHorizontal: 12,
    height: 50,
    overflow: 'hidden', // Added to clip children
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    height: '100%',
  },
  focusedBorder: {
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  errorBorder: {
    borderColor: Colors.error,
  },
  icon: {
    marginRight: 10,
  },
  eyeIcon: {
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    color: Colors.error,
    marginTop: 4,
    marginLeft: 4,
  },
});
