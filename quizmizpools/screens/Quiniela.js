import React, { useState } from 'react';
import { 
    Image,
    ImageBackground,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

const Quiniela = ({ navigation }) => {

    const equipos = ['Equipo 1', 'Equipo 2', 'Equipo 3', 'Equipo 4', 'Equipo 5'];

    const [selections, setSelections] = useState(Array(equipos.length).fill(null));

    const renderHeader = () => {
      return (
        <View style={[styles.row, styles.headerRow]}>
          <Text style={styles.headerCell}>Partido</Text>
          <Text style={styles.headerCell} onPress={() => handleColumnSelection('1')}>1</Text>
          <Text style={styles.headerCell} onPress={() => handleColumnSelection('X')}>X</Text>
          <Text style={styles.headerCell} onPress={() => handleColumnSelection('2')}>2</Text>
          <Text style={styles.headerCell}>Resultado</Text>
        </View>
      );
    };

    const renderRow = (rowData, rowNumber) => {
      return (
        <View style={styles.row} key={rowNumber}>
          <Text style={styles.cell}>{rowData[0]}</Text>
          <TouchableOpacity style={styles.cell} onPress={() => handleCellSelection(rowNumber, '1')}>
            <Text>{selections[rowNumber - 1] === '1' ? '✔' : ''}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cell} onPress={() => handleCellSelection(rowNumber, 'X')}>
            <Text>{selections[rowNumber - 1] === 'X' ? '✔' : ''}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cell} onPress={() => handleCellSelection(rowNumber, '2')}>
            <Text>{selections[rowNumber - 1] === '2' ? '✔' : ''}</Text>
          </TouchableOpacity>
          <Text style={styles.cell}>1 - 0</Text>
        </View>
      );
    };

    const handleColumnSelection = (value) => {
      setSelections((prevSelections) => prevSelections.map((_, index) => value));
    };

    const handleCellSelection = (rowNumber, value) => {
      setSelections((prevSelections) => {
        const newSelections = [...prevSelections];
        newSelections[rowNumber - 1] = value;
        return newSelections;
      });
    };


    return (
        <View style={styles.container}>
          {renderHeader()}
          {equipos.map((name, index) => renderRow([name], index + 1))}
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  headerRow: {
    backgroundColor: '#ddd',
    fontWeight: 'bold',
  },
  cell: {
    borderWidth: 1,
    padding: 10,
    flex: 1,
    textAlign: 'center',
  },
  headerCell: {
    borderWidth: 1,
    padding: 10,
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  }
});

export default Quiniela;