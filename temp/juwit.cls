%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Author : Sebastian Faase                                          %
% Licence: The MIT License (MIT) http://opensource.org/licenses/MIT %
% About  : template for juwit editor                                %
% Version: 0.1                                                      %
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


% VAR
\def\defaultFontSize#1{\def\@defaultFontSize{#1}}
\def\topSpace#1{\def\@topSpace{#1}}
\def\buttomSpace#1{\def\@buttomSpace{#1}}
\def\leftBoarderSpace#1{\def\@leftBoarderSpace{#1}}
\def\rightBoarderSpace#1{\def\@rightBoarderSpace{#1}}

% INIT
\defaultFontSize{10pt}		% 10pt-12pt
\topSpace{20mm}
\buttomSpace{20mm}
\leftBoarderSpace{20mm}
\rightBoarderSpace{20mm}


% LaTeX version
\NeedsTeXFormat{LaTeX2e}

% Class description
\ProvidesClass{juwit}[2015/03/02 class file for juwit editor] 

% based on article styled class with \normalsize \defaultFontSize
\LoadClass[\@defaultFontSize]{article}

% page setup
\RequirePackage[left = \@leftBoarderSpace, right = \@rightBoarderSpace, top = \@topSpace, bottom = \@buttomSpace]{geometry}

% use encoding utf8
\RequirePackage[utf8]{inputenc}

% amsmath for better looking formulas
\RequirePackage{amsmath}

% replace default font with Latin Modern
\RequirePackage{lmodern}
\RequirePackage[T1]{fontenc}

% change ordered list behaviour
\let\oldenumerate\enumerate
\renewcommand{\enumerate}{
  \oldenumerate
  \setlength{\itemsep}{1mm}
  \setlength{\parskip}{0mm}
  \setlength{\parsep}{0mm}
}

% change unordered list behaviour
\let\olditemize\itemize
\renewcommand{\itemize}{
  \olditemize
  \setlength{\itemsep}{1mm}
  \setlength{\parskip}{0mm}
  \setlength{\parsep}{0mm}
}
