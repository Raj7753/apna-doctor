// AI Service for symptom analysis using Google Gemini API

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

function buildPrompt(symptoms) {
  return `You are an expert clinical pharmacist and medical triage specialist with 20+ years of experience. Analyze symptoms with precision and recommend REAL, SPECIFIC medicines available in India.

PATIENT INFORMATION:
- Primary Symptoms: ${symptoms.symptomsText}
- Severity Level (self-reported): ${symptoms.severity}
- Patient Age: ${symptoms.age} years old
- Gender: ${symptoms.gender || 'Not specified'}
${symptoms.onset ? `- Symptom Onset: ${symptoms.onset}` : ""}
${symptoms.duration ? `- Duration: ${symptoms.duration}` : ""}
${symptoms.activityLevel ? `- Physical Activity Level: ${symptoms.activityLevel}` : ""}
${symptoms.stressLevel ? `- Current Stress Level: ${symptoms.stressLevel}` : ""}
${symptoms.existingConditions ? `- Existing Medical Conditions: ${symptoms.existingConditions}` : ""}
${symptoms.currentMedications ? `- Current Medications: ${symptoms.currentMedications}` : ""}
${symptoms.allergies ? `- Known Allergies: ${symptoms.allergies}` : ""}
${symptoms.isPregnant ? "- IMPORTANT: Patient is pregnant or might be pregnant" : ""}

SYMPTOM ANALYSIS GUIDELINES:
1. Match symptoms to specific conditions using clinical diagnostic criteria
2. Consider differential diagnosis - list conditions from most to least likely
3. Account for age-specific presentations (children, elderly)
4. Check for red flag symptoms requiring immediate attention
5. Consider drug interactions with current medications

MEDICINE RECOMMENDATION RULES (VERY IMPORTANT):
- Recommend REAL OTC medicines with INDIAN BRAND NAMES
- Include generic name + brand name (e.g., "Paracetamol (Crocin/Dolo 650)")
- Provide EXACT dosages based on patient's age
- For children: Calculate age-appropriate doses
- Include at least 3-4 medicine recommendations when appropriate

COMMON OTC MEDICINES DATABASE (Use these real medicines):
PAIN/FEVER: Paracetamol (Crocin, Dolo 650, Calpol), Ibuprofen (Brufen, Combiflam), Nimesulide (Nimulid), Diclofenac (Voveran)
COLD/COUGH: Cetirizine (Cetzine, Alerid), Levocetirizine (Levocet), Chlorpheniramine (Avil), Dextromethorphan (Benadryl DR), Guaifenesin (Grilinctus), Ambroxol (Mucolite)
ACIDITY/DIGESTION: Omeprazole (Omez), Pantoprazole (Pan 40), Ranitidine (Zinetac), Antacids (Digene, Gelusil), Domperidone (Domstal)
ALLERGIES: Cetirizine (Cetzine), Fexofenadine (Allegra), Loratadine (Claritin), Montelukast (Montair)
THROAT: Strepsils lozenges, Vicks lozenges, Betadine Gargle, Tantum Verde
MUSCLE PAIN: Diclofenac gel (Voveran Emulgel), Ibuprofen gel (Brufen gel), Muscle relaxant (Myospaz)
VITAMINS: Vitamin C (Celin, Limcee), Multivitamins (Becosules, Supradyn), Vitamin D3 (D-Rise, Calcirol)
ANTIBACTERIAL: Neosporin (topical), Betadine, Soframycin
DIARRHEA: ORS (Electral), Loperamide (Eldoper), Probiotics (Enterogermina, Econorm)

TRIAGE LEVELS:
- "emergency": Life-threatening (chest pain radiating to arm/jaw, severe breathing difficulty, stroke signs FAST, anaphylaxis, severe bleeding, loss of consciousness, seizures)
- "urgent-visit": Needs doctor within 24 hours (high fever >103°F for 2+ days, severe pain, signs of infection, dehydration)
- "see-doctor": Schedule appointment within 3-7 days (persistent symptoms, moderate pain, recurring issues)
- "self-care": Manage at home (mild cold, minor aches, seasonal allergies)

WORKOUT & EXERCISE RECOMMENDATIONS:
- Provide age-appropriate and condition-specific exercises
- Include intensity levels: Light (gentle walking, stretching), Moderate (brisk walking, yoga), Avoid (for certain conditions)
- Consider the patient's current health status
- Examples: Gentle stretching for back pain, breathing exercises for respiratory issues, light walking for recovery, rest for acute illness
- Always include precautions specific to the condition

MEDITATION & MINDFULNESS PRACTICES:
- Recommend evidence-based techniques: Deep breathing (4-7-8 technique), Progressive muscle relaxation, Guided imagery, Body scan meditation
- Provide clear, step-by-step instructions
- Specify optimal timing (morning for energy, evening for sleep, during symptoms for relief)
- Include benefits specific to the condition (stress reduction, pain management, better sleep)

LIFESTYLE MODIFICATIONS:
- Provide practical, actionable advice for categories: Sleep hygiene, Stress management, Posture correction, Hydration, Environmental factors
- Explain why each modification matters for recovery
- Make recommendations specific to the patient's condition

CLINICAL SUMMARY REQUIREMENT:
- Provide a professional "clinicalSummary" that reads like a doctor's assessment
- Include a 3-step "recoveryPath" with timeline and specific actions

RESPOND WITH VALID JSON ONLY (no markdown, no code blocks):
{
  "clinicalSummary": "Professional medical summary of patient presentation, likely diagnosis, and recommended course of action",
  "triageLevel": "emergency" | "urgent-visit" | "see-doctor" | "self-care",
  "triageReason": "Detailed clinical reasoning for triage level based on specific symptoms presented",
  "recoveryPath": [
    { "step": "Immediate Relief (0-4 hours)", "action": "Specific immediate action", "details": "Why this helps" },
    { "step": "Short-term Management (1-3 days)", "action": "What to monitor/continue", "details": "Expected progress" },
    { "step": "Recovery & Prevention (3-7 days)", "action": "Long-term care and prevention", "details": "When to expect full recovery" }
  ],
  "possibleConditions": [
    {
      "name": "Most likely condition name",
      "probability": "High/Medium/Low",
      "explanation": "Why this condition matches the symptoms"
    },
    {
      "name": "Second possible condition",
      "probability": "Medium/Low",
      "explanation": "Supporting symptoms for this diagnosis"
    },
    {
      "name": "Third possible condition",
      "probability": "Low",
      "explanation": "Differential diagnosis consideration"
    }
  ],
  "recommendations": {
    "medicines": [
      {
        "name": "Generic Name (Brand Name)",
        "type": "Tablet/Syrup/Gel/Drops",
        "dose": "Exact dose for this patient's age (e.g., '650mg tablet' or '5ml syrup')",
        "frequency": "How often (e.g., 'Every 6 hours' or 'Twice daily')",
        "duration": "How long to take (e.g., '3-5 days' or 'Until symptoms resolve')",
        "timing": "Before/after meals, morning/night",
        "purpose": "What symptom this treats",
        "warnings": "Important precautions or contraindications",
        "maxDailyDose": "Maximum safe dose per day"
      }
    ],
    "homeRemedies": [
      {
        "remedy": "Specific home remedy",
        "howTo": "Step-by-step instructions",
        "frequency": "How often to do this",
        "benefit": "Why this helps"
      }
    ],
    "immediateActions": ["What to do right now - step 1", "Step 2", "Step 3"],
    "whatToDo": ["Clear action step 1", "Action step 2", "Action step 3"],
    "whatNotToDo": ["Thing to avoid 1", "Thing to avoid 2"],
    "thingsToAvoid": ["Specific thing to avoid and why", "Another thing to avoid"],
    "dietaryAdvice": [
      {
        "recommendation": "Specific food/drink advice",
        "reason": "Why this helps recovery"
      }
    ],
    "workoutRoutine": [
      {
        "exercise": "Specific exercise or activity",
        "sets": "Number of sets (e.g., '3 sets')",
        "reps": "Number of repetitions (e.g., '10 reps' or '30 seconds hold')",
        "duration": "How long to do it",
        "frequency": "How often per day/week",
        "intensity": "Light/Moderate/Avoid",
        "benefit": "How this helps with recovery",
        "precautions": "What to watch out for"
      }
    ],
    "meditationPractices": [
      {
        "technique": "Name of meditation/breathing technique",
        "duration": "How long (e.g., 5-10 minutes)",
        "timing": "When to practice (morning/evening/before sleep)",
        "steps": ["Step 1", "Step 2", "Step 3"],
        "benefit": "How this helps with symptoms/stress"
      }
    ],
    "lifestyleModifications": [
      {
        "category": "Sleep/Stress/Posture/Hydration/etc",
        "advice": "Specific actionable advice",
        "importance": "Why this matters for recovery"
      }
    ],
    "warningSignsToWatch": ["Symptom that means condition is worsening", "Another warning sign"],
    "doctorSpecialization": "Type of specialist to see (General Physician/Cardiologist/ENT/Dermatologist/Gastroenterologist/Orthopedic/etc.)",
    "recommendedDoctors": [
      {
        "name": "Dr. [Name] (Example only - user should search locally)",
        "specialization": "Specialty",
        "qualification": "MBBS, MD, etc",
        "searchKeyword": "Keyword for finding similar doctors nearby (e.g., 'Cardiologist near me', 'ENT specialist')"
      }
    ],
    "testsRecommended": ["Blood test/X-ray/other tests that doctor might order"],
    "emergencyContacts": [
      {"service": "Emergency Ambulance", "number": "108", "description": "Free ambulance service"},
      {"service": "National Emergency", "number": "112", "description": "Police/Fire/Medical emergency"}
    ]
  },
  "expectedRecoveryTime": "How long until symptoms should improve with treatment",
  "followUpAdvice": "When to see a doctor if symptoms don't improve",
  "confidenceScore": 0.85,
  "disclaimer": "This is for educational purposes only. Always consult a qualified healthcare professional before taking any medication. Dosages may need adjustment based on individual factors."
}

IMPORTANT: Be specific with medicine names, doses, and timing. Use real Indian brand names. Provide actionable, practical advice.`;
}

function parseAIResponse(responseText) {
  try {
    // Remove markdown code blocks if present
    let cleanText = responseText;
    cleanText = cleanText.replace(/```json\s*/gi, '');
    cleanText = cleanText.replace(/```\s*/gi, '');
    cleanText = cleanText.trim();
    
    // Try to find JSON in the response
    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('No valid JSON found in response');
  } catch (error) {
    console.error('Error parsing AI response:', error);
    console.error('Raw response:', responseText);
    return null;
  }
}

async function analyzeWithGemini(symptoms) {
  try {
    console.log('🤖 Calling Google Gemini API for symptom analysis...');
    const prompt = buildPrompt(symptoms);

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.3,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_NONE"
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error response:', errorData);
      throw new Error(`Gemini API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    console.log('✅ Gemini API response received');
    
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('Empty response from Gemini');
    }

    console.log('📝 Raw AI response:', text.substring(0, 200) + '...');
    
    const parsed = parseAIResponse(text);
    if (parsed) {
      console.log('✅ Successfully parsed AI response');
      return parsed;
    }
    
    throw new Error('Failed to parse Gemini response');
  } catch (error) {
    console.error('❌ Gemini API error:', error.message);
    return null;
  }
}

function getFallbackResponse(symptoms) {
  const isEmergency =
    symptoms.severity === 'critical' ||
    /chest pain|difficulty breathing|unconscious|severe bleeding|stroke|heart attack/i.test(
      symptoms.symptomsText
    );

  if (isEmergency) {
    return {
      triageLevel: 'emergency',
      triageReason:
        'Based on the symptoms described, immediate medical attention is recommended.',
      possibleConditions: ['Requires immediate medical evaluation'],
      recommendations: {
        medicines: [],
        homeRemedies: [],
        whatToDo: [
          'Call emergency services immediately (112 in India)',
          'Stay calm and do not panic',
          'Have someone stay with you',
          'Keep airways clear',
        ],
        whatNotToDo: ['Do not drive yourself to the hospital', 'Do not delay seeking help', 'Do not take any medication without medical supervision'],
        dietaryAdvice: [],
        doctorSpecialization: 'Emergency Medicine',
        emergencyContacts: [
          { service: 'Emergency', number: '112', description: 'India Emergency Number' },
          { service: 'Ambulance', number: '102', description: 'National Ambulance Service' },
          { service: 'AIIMS Emergency', number: '011-26588500', description: 'AIIMS Hospital Delhi' },
        ],
      },
      followUpAdvice: 'Seek immediate emergency medical care. Do not wait.',
      confidenceScore: 0.7,
      disclaimer:
        'This is an educational tool only and not medical advice. Please seek immediate medical attention.',
    };
  }

  return {
    triageLevel: 'see-doctor',
    triageReason:
      'Based on the symptoms provided, we recommend consulting a healthcare professional for proper evaluation. The AI service is temporarily unavailable.',
    possibleConditions: ['Requires professional medical evaluation'],
    recommendations: {
      medicines: [],
      homeRemedies: ['Rest adequately', 'Stay hydrated with water and clear fluids', 'Monitor your symptoms closely'],
      whatToDo: [
        'Schedule an appointment with a doctor within 24-48 hours',
        'Keep track of your symptoms in a diary',
        'Note any changes or new symptoms',
        'Take your temperature if you have fever',
      ],
      whatNotToDo: ['Do not self-medicate without professional advice', 'Do not ignore worsening symptoms', 'Do not delay if symptoms worsen'],
      dietaryAdvice: ['Eat light, easily digestible foods', 'Avoid spicy and oily foods', 'Stay hydrated'],
      doctorSpecialization: 'General Physician',
      emergencyContacts: [
        { service: 'Emergency', number: '112', description: 'India Emergency Number' },
      ],
    },
    followUpAdvice: 'If symptoms worsen or new symptoms appear, seek medical attention immediately.',
    confidenceScore: 0.5,
    disclaimer:
      'This is an educational tool only and not medical advice. Always consult healthcare professionals. AI service was unavailable, showing default guidance.',
  };
}

export async function analyzeSymptoms(symptoms) {
  try {
    console.log('🏥 Starting symptom analysis...');
    console.log('📋 Symptoms:', JSON.stringify(symptoms, null, 2));
    
    // Try Gemini API
    const result = await analyzeWithGemini(symptoms);
    if (result) {
      console.log('✅ Returning Gemini AI analysis');
      return result;
    }

    // Fallback response if API fails
    console.log('⚠️ Using fallback response (API unavailable)');
    return getFallbackResponse(symptoms);
  } catch (error) {
    console.error('❌ AI analysis error:', error);
  }
}

// Helper to convert file to base64
import fs from 'fs';

export async function analyzeImage(filePath, mimeType) {
  try {
    console.log('🖼️  Analyzing image with Gemini Vision...');
    const imageBase64 = fs.readFileSync(filePath).toString('base64');

    const prompt = `
      You are an expert Pathologist and Medical Analyst. 
      Analyze this medical report image.
      
      EXTRACT AND EXPLAIN:
      1. List of Tests performed (e.g., Hemoglobin, Lipid Profile).
      2. Key Values found (e.g., 12.5 g/dL).
      3. Reference Range comparison (Is it High, Low, or Normal?).
      4. SUMMARY: What does this mean for the patient in simple English?
      
      RESPOND JSON ONLY:
      {
        "findings": [
          { "test": "Test Name", "value": "Value", "status": "High/Low/Normal", "meaning": "Simple explanation" }
        ],
        "summary": "Overall summary of health status based on this report.",
        "recommendations": ["Diet tip 1", "Lifestyle tip 2"]
      }
    `;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: mimeType,
                data: imageBase64
              }
            }
          ]
        }]
      })
    });

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('No text from Vision API');
    
    return parseAIResponse(text);

  } catch (error) {
    console.error('❌ Vision Analysis Error:', error);
    return null;
  }
}

export async function chatWithAI(message, history = []) {
  try {
    console.log('💬 Chatting with AI...');
    
    const historyText = history.map(h => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.text}`).join('\n');
    
    const prompt = `
      You are "Apna Doctor", a highly advanced, compassionate, and expert AI Medical Assistant.
      Your goal is to provide accurate, helpful, and safe health information.

      CONTEXT:
      ${historyText}
      
      USER QUESTION: ${message}

      GUIDELINES:
      1. Be empathetic and professional.
      2. If the user asks about serious symptoms, advise seeing a doctor immediately.
      3. For general queries (diet, lifestyle, mild issues), provide detailed, actionable advice.
      4. Use formatting (bullet points) for readability where appropriate.
      5. Keep responses concise but complete (under 150 words preferred unless detail is asked).
      6. STRICTLY NO DIAGNOSIS for serious conditions. Always include a subtle disclaimer.

      Response:
    `;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    return text || "I apologize, I'm having trouble connecting right now.";

  } catch (error) {
    console.error('Chat Error:', error);
    return "I'm experiencing a temporary glitch. Please try again.";
  }
}
