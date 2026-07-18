import {
    Document,
    Page,
    Text,
    View,
    Image,
    StyleSheet,
    pdf, Font
} from "@react-pdf/renderer"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useState } from "react"

Font.register({
    family: "MonsieurLaDoulaise",
    fonts: [
        { src: "/fonts/MonsieurLaDoulaise-Regular.ttf" },
    ]
})
Font.register({
    family: "Corinthia",
    fonts: [
        { src: "/fonts/Corinthia-Bold.ttf" },
        { src: "/fonts/Corinthia-Regular.ttf" },
    ]
})


const S = StyleSheet.create({



    page: {
        backgroundColor: "#0A0A0A",
        width: "100%",
        height: "100%",
        position: "relative",
        fontFamily: "Helvetica",
    },
    logoBg: {
        position: "absolute",
        left: "-9%",
        bottom: "-7%",
        width: "55%",
        height: "90%",
        opacity: 0.3,
    },
    stripLeft: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 8,
        height: "100%",
        backgroundColor: "#DD0081",
    },
    stripRight: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 8,
        height: "100%",
        backgroundColor: "#DD0081",
    },
    // Línea horizontal superior decorativa
    lineTop: {
        position: "absolute",
        top: 40,
        left: 40,
        right: 40,
        height: 0.8,
        backgroundColor: "#DD0081",
        opacity: 0.4,
    },
    lineBottom: {
        position: "absolute",
        bottom: 40,
        left: 40,
        right: 40,
        height: 0.8,
        backgroundColor: "#DD0081",
        opacity: 0.4,
    },
    cornerTL: {
        position: "absolute",
        top: 18,
        left: 18,
        width: 22,
        height: 22,
        borderTop: "1.5px solid #DD0081",
        borderLeft: "1.5px solid #DD0081",
    },
    cornerTR: {
        position: "absolute",
        top: 18,
        right: 18,
        width: 22,
        height: 22,
        borderTop: "1.5px solid #DD0081",
        borderRight: "1.5px solid #DD0081",
    },
    cornerBL: {
        position: "absolute",
        bottom: 18,
        left: 18,
        width: 22,
        height: 22,
        borderBottom: "1.5px solid #DD0081",
        borderLeft: "1.5px solid #DD0081",
    },
    cornerBR: {
        position: "absolute",
        bottom: 18,
        right: 18,
        width: 22,
        height: 22,
        borderBottom: "1.5px solid #DD0081",
        borderRight: "1.5px solid #DD0081",
    },
    content: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 60,
        paddingVertical: 50,
    },
    studioName: {
        fontFamily: "Helvetica",
        fontSize: 12,
        color: "#DD0081",
        letterSpacing: 7,
        textAlign: "center",
        marginBottom: 1,
    },
    studioSub: {
        fontFamily: "Helvetica",
        fontSize: 10,
        color: "#444",
        letterSpacing: 6,
        textAlign: "center",
        marginBottom: 18,
    },
    cursiva: {
        fontFamily: "Corinthia",
        fontSize: 72,
        color: "#F0EDE8",
        textAlign: "center",
        marginBottom: 0,
        lineHeight: 1,
    },
    accentLine: {
        height: 2,
        backgroundColor: "#DD0081",
        width: "55%",
        marginTop: 10,
        marginBottom: 14,
    },
    certificaQue: {
        fontFamily: "Helvetica-Bold",
        fontSize: 8,
        color: "#a1a1a1",
        letterSpacing: 5,
        textAlign: "center",
        marginBottom: 10,
    },
    alumnoNombre: {
        fontFamily: "Corinthia",
        fontSize: 40,
        color: "#F0EDE8",
        letterSpacing: 2,
        textAlign: "center",
        marginBottom: 14,
    },
    bodyText: {
        fontFamily: "Helvetica",
        fontSize: 10,
        color: "#b9b9b9",
        lineHeight: 1.9,
        textAlign: "center",
    },
    cursoTitulo: {
        fontFamily: "Helvetica-Bold",
        fontSize: 22,
        color: "#DD0081",
        letterSpacing: 0.5,
        textAlign: "center",
        marginTop: 4,
        marginBottom: 4,
    },
    accentLineThin: {
        height: 0.5,
        backgroundColor: "#222",
        width: "50%",
        marginTop: 16,
    },
    footer: {
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    footerLogo: {
        width: 16,
        height: 16,
        objectFit: "contain",
        opacity: 0.5,
    },
    footerText: {
        fontFamily: "Helvetica",
        fontSize: 12,
        color: "#6a6a6a",
        letterSpacing: 5,
    },
    footerPink: {
        fontFamily: "Helvetica-Bold",
        fontSize: 12,
        color: "#DD0081",
        letterSpacing: 5,
    },
})


type DocProps = {
    alumnoNombre: string
    cursoTitulo: string
}

function CertificadoDoc({ alumnoNombre, cursoTitulo }: DocProps) {
    return (
        <Document>
            <Page size="A4" orientation="landscape" style={S.page}>

                <Image src="/logo.png" style={S.logoBg} />

                <View style={S.stripLeft} />
                <View style={S.stripRight} />
                <View style={S.lineTop} />
                <View style={S.lineBottom} />
                <View style={S.cornerTL} />
                <View style={S.cornerTR} />
                <View style={S.cornerBL} />
                <View style={S.cornerBR} />

                <View style={S.content}>
                    <Text style={S.studioName}>H E X A G O N I K</Text>
                    <Text style={S.studioSub}>T A T T O O  ·  S T U D I O</Text>

                    <Text style={S.cursiva}>Certificado</Text>

                    <View style={S.accentLine} />

               

                    <Text style={S.alumnoNombre}>{alumnoNombre}</Text>

                    <Text style={S.bodyText}>concluyó con el curso de</Text>

                    <Text style={S.cursoTitulo}>{cursoTitulo}</Text>

                    <Text style={S.bodyText}>
                        que contempla desde técnicas básicas hasta más avanzadas y específicas.
                    </Text>

                    <View style={S.accentLineThin} />
                </View>

                <View style={S.footer}>
                    <Image src="/logo.png" style={S.footerLogo} />
                    <Text style={S.footerPink}>HEXA</Text>
                    <Text style={S.footerText}>GONIK</Text>
                </View>

            </Page>
        </Document>
    )
}

type CertificadoButtonProps = {
    alumnoNombre: string
    cursoTitulo: string
}

export function CertificadoButton({ alumnoNombre, cursoTitulo }: CertificadoButtonProps) {
    const [isGenerating, setIsGenerating] = useState(false)

    async function handleDescargar() {
        setIsGenerating(true)
        try {
            const blob = await pdf(
                <CertificadoDoc
                    alumnoNombre={alumnoNombre}
                    cursoTitulo={cursoTitulo}
                />
            ).toBlob()

            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `Certificado - ${cursoTitulo} - ${alumnoNombre}.pdf`
            a.click()
            URL.revokeObjectURL(url)
        } catch (err) {
            console.error("Error generando certificado:", err)
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <Button
            onClick={handleDescargar}
            disabled={isGenerating}
            
        >
            <Download className="size-4" />
            {isGenerating ? "Generando..." : "Descargar certificado"}
        </Button>
    )
}