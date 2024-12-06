import React, { useState, useEffect, useRef, useMemo } from "react";
import {
    GluestackUIProvider,
    SafeAreaView,
    ScrollView,
    FormControl,
    FormControlLabel,
    FormControlLabelText,
    Input,
    InputField,
    Button,
    ButtonText,
    Select,
    SelectTrigger,
    SelectInput,
    SelectPortal,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicator,
    SelectDragIndicatorWrapper,
    SelectItem,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { StyleSheet, Text, View, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import MainHeader from "../../components/MainHeader";
import { ArrowLeft } from "lucide-react-native";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import BottomSheet, { BottomSheetScrollView, BottomSheetTextInput } from "@gorhom/bottom-sheet";

export default function SupportScreen({ navigation }) {
    const { authData, librarian, isLibrarianAuthenticated } = useAuth();
    const [mensagem, setMensagem] = useState("");
    const [mensagens, setMensagens] = useState([]);
    const [filteredMensagens, setFilteredMensagens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [resposta, setResposta] = useState("");
    const [filterStatus, setFilterStatus] = useState("todos");

    // Bottom Sheet Reference and Configuration
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ["50%", "80%"], []);

    // Função para buscar mensagens
    const fetchMensagens = async () => {
        setLoading(true);
        try {
            let response;
            if (isLibrarianAuthenticated()) {
                // Para bibliotecários, buscar todas as mensagens
                response = await axios.get('http://10.0.2.2:8085/api/listMessage');
            } else {
                // Para estudantes, buscar apenas suas mensagens
                if (!authData?.user?.rm) {
                    Alert.alert('Erro', 'Usuário não autenticado');
                    setLoading(false);
                    return;
                }
                response = await axios.get(`http://10.0.2.2:8085/api/listMessage/${authData.user.rm}`);
            }
            
            // Ordenar mensagens por data mais recente
            const sortedMensagens = response.data.sort((a, b) => 
                new Date(b.created_at) - new Date(a.created_at)
            );
            
            setMensagens(sortedMensagens);
            applyFilter(sortedMensagens, filterStatus);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao buscar mensagens:', error);
            Alert.alert('Erro', 'Não foi possível carregar as mensagens');
            setLoading(false);
        }
    };

    // Aplicar filtro de status
    const applyFilter = (messages, status) => {
        let filtered = messages;
        
        switch(status) {
            case "aberto":
                filtered = messages.filter(msg => msg.status === "Aberto" || msg.status === "Em andamento");
                break;
            case "resolvido":
                filtered = messages.filter(msg => msg.status === "Resolvido");
                break;
            default:
                filtered = messages;
        }

        setFilteredMensagens(filtered);
    };

    // Alterar filtro
    const handleFilterChange = (status) => {
        setFilterStatus(status);
        applyFilter(mensagens, status);
    };

    // Carregar mensagens quando a tela for carregada
    useEffect(() => {
        fetchMensagens();
    }, [authData, filterStatus]);

    // Enviar mensagem para estudante
    const handleSendResponse = async () => {
        if (!resposta) {
            Alert.alert('Erro', 'Digite uma resposta');
            return;
        }
    
        if (!selectedMessage || !selectedMessage.id) {
            Alert.alert('Erro', 'Mensagem não selecionada');
            return;
        }
    
        try {
            await axios.put(`http://10.0.2.2:8085/suporte/${selectedMessage.id}/responder`, {
                resposta: resposta
            });
    
            Alert.alert('Sucesso', 'Resposta enviada');
            setResposta('');
            bottomSheetRef.current?.close();
            fetchMensagens();
        } catch (error) {
            console.error('Erro ao enviar resposta:', error);
            Alert.alert('Erro', 'Não foi possível enviar a resposta');
        }
    };

    // Enviar mensagem para bibliotecário (para estudante)
    const handleStudentMessage = async () => {
        if (!mensagem) {
            Alert.alert('Erro', 'Digite sua mensagem');
            return;
        }

        const data = {
            student_rm: authData.user.rm,
            mensagem: mensagem
        };

        try {
            await axios.post('http://10.0.2.2:8085/api/createMessage', data);
            Alert.alert('Sucesso', 'Mensagem Enviada');
            setMensagem('');
            fetchMensagens();
        } catch (error) {
            const errorMessage = error.response?.data?.msg || 
                                 error.response?.data?.message || 
                                 'Erro ao enviar mensagem';
            Alert.alert('Erro', errorMessage);
        }
    };

    // Abrir Bottom Sheet com detalhes da mensagem
    const openMessageDetails = (msg) => {
        setSelectedMessage(msg);
        bottomSheetRef.current?.expand();
    };

    // Formatar data
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Renderização condicional baseada no tipo de usuário
    return (
        <GluestackUIProvider config={config}>
            <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <MainHeader 
                            title={isLibrarianAuthenticated() ? "Mensagens de Suporte" : "Envie sua dúvida"} 
                            icon1={ArrowLeft} 
                            onPress={() => navigation.goBack()} 
                        />

                        {/* Seção para estudante */}
                        {!isLibrarianAuthenticated() && (
                            <>
                                <View style={styles.inputContainer}>
                                    <FormControl style={styles.formControl}>
                                        <FormControlLabel>
                                            <FormControlLabelText style={styles.formText}>
                                                Envie sua dúvida
                                            </FormControlLabelText>
                                        </FormControlLabel>
                                        <Input style={styles.input}>
                                            <InputField 
                                                style={styles.inputText} 
                                                placeholder="Digite sua dúvida aqui" 
                                                onChangeText={text => setMensagem(text)} 
                                                value={mensagem} 
                                            />
                                        </Input>
                                    </FormControl>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <Button
                                        style={styles.buttonSolid}
                                        onPress={handleStudentMessage}>
                                        <ButtonText>Enviar Mensagem</ButtonText>
                                    </Button>
                                </View>
                            </>
                        )}

                        {/* Seção de filtros para bibliotecário */}
                        {isLibrarianAuthenticated() && (
                            <View style={styles.filterContainer}>
                                <Select onValueChange={handleFilterChange} selectedValue={filterStatus}>
                                    <SelectTrigger variant="outline" size="md">
                                        <SelectInput placeholder="Filtrar mensagens" />
                                    </SelectTrigger>
                                    <SelectPortal>
                                        <SelectBackdrop />
                                        <SelectContent>
                                            <SelectDragIndicatorWrapper>
                                                <SelectDragIndicator />
                                            </SelectDragIndicatorWrapper>
                                            <SelectItem value="todos" label="Todas as Mensagens" />
                                            <SelectItem value="aberto" label="Mensagens Pendentes" />
                                            <SelectItem value="resolvido" label="Mensagens Respondidas" />
                                        </SelectContent>
                                    </SelectPortal>
                                </Select>
                            </View>
                        )}

                        <View style={styles.userSection}>
                            <Text style={styles.userSectionTitle}>
                                {isLibrarianAuthenticated() ? "Mensagens de Suporte" : "Suas Dúvidas"}
                            </Text>
                            
                            {loading ? (
                                <ActivityIndicator size="large" color="#0000ff" />
                            ) : (
                                filteredMensagens.length === 0 ? (
                                    <Text style={styles.noMessagesText}>Nenhuma mensagem encontrada</Text>
                                ) : (
                                    filteredMensagens.map((msg) => (
                                        <TouchableOpacity 
                                            key={msg.id} 
                                            style={styles.doubtItem}
                                            onPress={() => openMessageDetails(msg)}
                                        >
                                            <View style={styles.doubtInfo}>
                                                <Text style={styles.studentDoubt} numberOfLines={2}>
                                                    {msg.mensagem}
                                                </Text>
                                                <Text style={styles.doubtDate}>
                                                    {formatDate(msg.created_at)}
                                                </Text>
                                                <Text style={[
                                                    styles.doubtStatus, 
                                                    {
                                                        color: 
                                                            msg.status === 'Aberto' ? 'orange' : 
                                                            msg.status === 'Em andamento' ? 'blue' : 
                                                            msg.status === 'Respondido' ? 'green' : 
                                                            'black'
                                                    }
                                                ]}>
                                                    Status: {msg.status}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                )
                            )}
                        </View>
                    </View>
                </ScrollView>

                {/* Bottom Sheet para Detalhes da Mensagem */}
                <BottomSheet
                    ref={bottomSheetRef}
                    index={-1}
                    snapPoints={snapPoints}
                    enablePanDownToClose={true}
                >
                    <BottomSheetScrollView contentContainerStyle={styles.bottomSheetContent}>
                        {selectedMessage && (
                            <View>
                                <Text style={styles.bottomSheetTitle}>Detalhes da Mensagem</Text>
                                
                                <View style={styles.messageDetailsContainer}>
                                    <Text style={styles.messageDetailsText}>
                                        {selectedMessage.mensagem}
                                    </Text>
                                    
                                    <View style={styles.messageMetaContainer}>
                                        <Text style={styles.messageMetaText}>
                                            Data: {formatDate(selectedMessage.created_at)}
                                        </Text>
                                        <Text style={[
                                            styles.messageStatusText,
                                            {
                                                color: 
                                                    selectedMessage.status === 'Aberto' ? 'orange' : 
                                                    selectedMessage.status === 'Em andamento' ? 'blue' : 
                                                    selectedMessage.status === 'Respondido' ? 'green' : 
                                                    'black'
                                            }
                                        ]}>
                                            Status: {selectedMessage.status}
                                        </Text>
                                    </View>
                                    
                                    {selectedMessage.resposta && (
                                        <View style={styles.responseContainer}>
                                            <Text style={styles.responseTitle}>Resposta:</Text>
                                            <Text style={styles.responseText}>
                                                {selectedMessage.resposta}
                                            </Text>
                                        </View>
                                    )}

                                    {/* Seção de resposta para bibliotecário */}
                                    {isLibrarianAuthenticated() && 
                                     (selectedMessage.status === 'Aberto' || selectedMessage.status === 'Em andamento') && (
                                        <View style={styles.librarianResponseContainer}>
                                            <Text style={styles.responseTitle}>Responder Dúvida</Text>
                                            <BottomSheetTextInput
                                                style={styles.responseInput}
                                                placeholder="Digite sua resposta"
                                                multiline={true}
                                                numberOfLines={4}
                                                value={resposta}
                                                onChangeText={setResposta}
                                            />
                                            <Button 
                                                style={styles.sendResponseButton}
                                                onPress={handleSendResponse}
                                            >
                                                <ButtonText>Enviar Resposta</ButtonText>
                                            </Button>
                                        </View>
                                    )}
                                </View>
                            </View>
                        )}
                    </BottomSheetScrollView>
                </BottomSheet>
            </SafeAreaView>
        </GluestackUIProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: '#fff',
        alignItems: "center",
    },
    inputContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },
    formControl: {
        backgroundColor: '#fff',
        borderRadius: 20,
        width: 327,
        height: 200,
        marginBottom: 20
    },
    formText: {
        color: 'black',
        fontWeight: 'bold',
    },
    inputText: {
        color: 'gray',
        fontSize: 15,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 20,
        width: 327,
        height: 200,
        alignItems: "flex-start"
    },
    buttonSolid: {
        backgroundColor: "#EE2D32",
        borderRadius: 30,
        width: 327,
        height: 56,
        marginBottom: 8,
    },
    buttonContainer: {
        alignSelf: "center",
        marginTop: 35,
        marginBottom: 20
    },
    userSection: {
        alignItens: "center",
        justifyContent: "center",
        width: "80%",
        marginTop: 10,
        marginBottom: 10
    },
    userSectionTitle: {
        color: "#000",
        fontSize: 24,
        fontWeight: "bold",
    },
    userDoubtContainer: {
        marginTop: 10,
        backgroundColor: "#ee2d",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    doubtTitle: {
        color: "#000",
        fontSize: 18
    },
    doubtStatus: {
        color: "#000",
        fontSize: 18
    },
    doubtItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginTop:10,
      },
      doubtInfo: {
        flex: 1,
        marginRight: 16,
        gap:5,
      },
      studentDoubt: {
        fontSize: 18,
        fontWeight: 'bold'
      },
      doubtDate: {
        fontSize: 14,
        color: '#666'
      },
      studentActions: {
        flexDirection: 'row'
      },
      actionButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
        marginLeft: 8
      },
      editButton: {
        backgroundColor: '#4CAF50'
      },
      deleteButton: {
        backgroundColor: '#F44336'
      },
      actionButtonText: {
        color: 'white',
        fontWeight: 'bold'
      },
      bottomSheetContent: {
        padding: 20,
    },
    bottomSheetTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    messageDetailsContainer: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 15,
    },
    messageDetailsText: {
        fontSize: 16,
        marginBottom: 10,
    },
    messageMetaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    messageMetaText: {
        fontSize: 14,
        color: '#666',
    },
    messageStatusText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    responseContainer: {
        marginTop: 15,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    responseTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    responseText: {
        fontSize: 15,
        color: '#333',
    },
    filterContainer: {
        paddingHorizontal: 20,
        marginVertical: 10,
        width:250
    },
    librarianResponseContainer: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    responseInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        minHeight: 100,
        textAlignVertical: 'top',
    },
    sendResponseButton: {
        width: '100%',
    }
});